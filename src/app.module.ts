import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { source } from '../database/config/typeorm.config';
import { CategoryController } from './categories/category.controller';
import { TagController } from './tags/tag.controller';
import { RecipeController } from './recipes/recipe.controller';
import { CategoryEntity } from './categories/category.entity';
import { TagEntity } from './tags/tag.entity';
import { RecipeEntity } from './recipes/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(source.options),
    TypeOrmModule.forFeature([CategoryEntity, TagEntity, RecipeEntity]),
  ],
  controllers: [
    AppController,
    CategoryController,
    TagController,
    RecipeController,
  ],
  providers: [AppService],
})
export class AppModule {}
