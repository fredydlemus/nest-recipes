import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/category.entity';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response.interceptor';
import { Repository } from 'typeorm';

@Controller('categories')
@UseInterceptors(FormatResponseInterceptor)
export class CategoryController {
  constructor(
    @InjectRepository(CategoryEntity)
    private _categoryRep: Repository<CategoryEntity>,
  ) { }

  @Get()
  index(): Promise<CategoryEntity[]> {
    return this._categoryRep.find();
  }

  @Get('/:category')
  async show(@Param('category') categoryId: string): Promise<CategoryEntity> {
    const id = parseInt(categoryId);

    return this._categoryRep.findOne({ where: { id }, relations: ['recipes', 'recipes.category', 'recipes.tags', 'recipes.user'] });
  }
}
