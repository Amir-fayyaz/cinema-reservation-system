import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePermissionCategoryDto,
  UpdatePermissionCategoryDto,
} from '../dto';
import { PermissionCategory } from '../entities/permission-category.entity';

@Injectable()
export class PermissionCategoryService {
  constructor(
    @InjectRepository(PermissionCategory)
    private readonly repository: Repository<PermissionCategory>,
  ) {}

  async create(dto: CreatePermissionCategoryDto) {
    const newCategory = this.repository.create(dto);
    return await this.repository.save(newCategory);
  }

  async findAll(): Promise<PermissionCategory[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<PermissionCategory | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePermissionCategoryDto) {
    const permissionCategory = await this.findOne(id);

    if (!permissionCategory)
      throw new NotFoundException('permission-category not found');

    Object.assign(permissionCategory, dto);

    return await this.repository.save(permissionCategory);
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }
}
