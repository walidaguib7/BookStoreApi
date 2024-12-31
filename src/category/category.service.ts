import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { createCategoryDto } from './dtos/create.dto';
import { updateCategoryDto } from './dtos/update.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findall() {
    return await this.categoryRepository.find();
  }
  async findById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (category == null) throw new NotFoundException();
    return category;
  }

  async createOne(dto: createCategoryDto) {
    const category = this.categoryRepository.create(dto);
    await this.categoryRepository.save(category);
  }

  async updateOne(id: number, dto: updateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (category == null) throw new NotFoundException();
    category.name = dto.name;
    category.description = dto.description;
    await this.categoryRepository.save(category);
  }

  async deleteOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (category == null) throw new NotFoundException();
    await this.categoryRepository.delete(category);
  }
}
