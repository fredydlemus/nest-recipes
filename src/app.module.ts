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
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(source.options),
    TypeOrmModule.forFeature([CategoryEntity, TagEntity, RecipeEntity]),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  ],
  controllers: [
    AppController,
    CategoryController,
    TagController,
    RecipeController,
  ],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
