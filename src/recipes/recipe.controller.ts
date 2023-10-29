import { Controller, Get, Param, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from 'src/recipes/recipe.entity';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response.interceptor';
import { RecipeDto } from './recipe.dto';
import { plainToClass } from 'class-transformer';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('recipes')
@UseInterceptors(FormatResponseInterceptor)
export class RecipeController {
  constructor(
    @InjectRepository(RecipeEntity)
    private _recipeRep: Repository<RecipeEntity>,
  ) { }

  @Get()
  index(): Promise<RecipeEntity[]> {
    return this._recipeRep.find();
  }

  @Get('/:recipe')
  @Serialize(RecipeDto)
  show(@Param('recipe') recipeId: string): Promise<RecipeEntity> {
    const id = parseInt(recipeId);
    return this._recipeRep.findOne({
      where: { id },
      relations: ['category', 'tags', 'user'],
    });
  }

  @Post()
  store() { }

  @Put()
  update() { }

  @Delete()
  destroy() { }
}
