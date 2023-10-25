import { CategoryEntity } from "../../src/categories/category.entity";
import { CategoriesFactory } from "../factories/category.factory";
import { RecipesFactory } from "../factories/recipe.factory";
import { TagsFactory } from "../factories/tag.factory";
import { UsersFactory } from "../factories/user.factory";
import MainSeeder from "../seeds/main.seeder";
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from 'typeorm-extension';
import { RecipeEntity } from "../../src/recipes/recipe.entity";
import { UserEntity } from "../../src/users/user.entity";
import { TagEntity } from "../../src/tags/tag.entity";

export const options = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [CategoryEntity, RecipeEntity, UserEntity, TagEntity],
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  seeds: [MainSeeder],
  factories: [CategoriesFactory, RecipesFactory, TagsFactory, UsersFactory]

};

export const source = new DataSource(options as DataSourceOptions & SeederOptions);