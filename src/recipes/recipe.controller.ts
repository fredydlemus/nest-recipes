import { Controller, Get, Param, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from 'src/recipes/recipe.entity';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response.interceptor';
import { RecipeDto } from './recipe.dto';
import { plainToClass } from 'class-transformer';

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
  async show(@Param('recipe') recipeId: string): Promise<RecipeDto> {
    const id = parseInt(recipeId);
    const recipe = await this._recipeRep.findOne({
      where: { id },
      relations: ['category', 'tags', 'user'],
    });

    const recipeDto = plainToClass(RecipeDto, recipe, {
      excludeExtraneousValues: true,
    });

    return recipeDto;
  }

  @Post()
  store() { }

  @Put()
  update() { }

  @Delete()
  destroy() { }
}
