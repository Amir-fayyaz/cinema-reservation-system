import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
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
}
