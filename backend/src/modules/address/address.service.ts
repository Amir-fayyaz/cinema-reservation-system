import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iranCities, iranProvinces } from '@shared/constants';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { FindCitiesDto } from './dto/find-cities.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly repository: Repository<Address>,
  ) {}

  async create(dto: CreateAddressDto): Promise<Address> {
    const newAddress = this.repository.create(dto);
    return await this.repository.save(newAddress);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Address>> {
    return paginate(query, this.repository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        city: [FilterOperator.EQ],
        province: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.repository.findOne({ where: { id } });
    if (!address) throw new NotFoundException();
    return address;
  }

  async update(id: string, dto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);
    Object.assign(address, dto);
    return await this.repository.save(address);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.exists(id);
    return await this.repository.softDelete({ id });
  }

  async provinces() {
    return iranProvinces.persian;
  }

  async cities(dto: FindCitiesDto) {
    const foundProvince = iranCities['persian'].find(
      (obj) => obj.province == dto.province,
    );

    if (foundProvince) {
      return foundProvince.cities;
    }
  }

  private async exists(id: string) {
    const address = await this.repository.exists({ where: { id } });
    if (!address) throw new NotFoundException();
  }
}
