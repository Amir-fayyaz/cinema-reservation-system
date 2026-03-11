import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CREATE_POSITION,
  DELETE_POSITION,
  READ_POSITION,
  UPDATE_POSITION,
} from '@shared/constants';
import { AuthorizeByPermission } from '@shared/decorators';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {
  constructor(private readonly service: PositionService) {}

  @Post()
  @AuthorizeByPermission([CREATE_POSITION])
  async create(@Body() dto: CreatePositionDto) {
    return await this.service.create(dto);
  }

  @Get()
  @AuthorizeByPermission([READ_POSITION])
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @AuthorizeByPermission([READ_POSITION])
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @AuthorizeByPermission([UPDATE_POSITION])
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePositionDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @AuthorizeByPermission([DELETE_POSITION])
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
