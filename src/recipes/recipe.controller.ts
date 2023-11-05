import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  Body,
  HttpCode
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from 'src/recipes/recipe.entity';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response.interceptor';
import { RecipeDto } from './recipe.dto';
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
  async store(@Body() payload: any) {
    const recipe = await this._recipeRep.create(payload);
    return this._recipeRep.save(recipe);
  }

  @Put('/:recipe')
  async update(@Param('recipe') id: string, @Body() payload: any) {
    const recipe = await this._recipeRep.findOne({
      where: { id: parseInt(id) },
    });

    return this._recipeRep.save({ ...recipe, ...payload });
  }

  @Delete('/:recipeId')
  @HttpCode(204)
  async destroy(@Param('recipeId') id: string) {
    const recipe = await this._recipeRep.findOne({
      where: { id: parseInt(id) },
    });

    await this._recipeRep.remove(recipe);
  }
}
