import { DataSource } from "typeorm";
import { UserEntity } from "../../src/users/user.entity";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CategoryEntity } from "../../src/categories/category.entity";
import { RecipeEntity } from "../../src/recipes/recipe.entity";
import { TagEntity } from "../../src/tags/tag.entity";
import { faker } from "@faker-js/faker";

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

        const userRepository = dataSource.getRepository(UserEntity);
        const categoryRepository = dataSource.getRepository(CategoryEntity);
        const tagRepository = dataSource.getRepository(TagEntity);
        const recipeRepository = dataSource.getRepository(RecipeEntity);

        const userFactory = factoryManager.get(UserEntity);
        const categoryFactory = factoryManager.get(CategoryEntity);
        const recipeFactory = factoryManager.get(RecipeEntity);
        const tagFactory = factoryManager.get(TagEntity);

        await categoryFactory.saveMany(12);
        await userFactory.saveMany(29);
        await tagFactory.saveMany(40);
        await recipeFactory.saveMany(5);

        const users = await userRepository.find();
        const tags = await tagRepository.find();
        const categories = await categoryRepository.find();
        const recipes = await recipeRepository.find();

        await Promise.all(recipes.map(async (recipe) => {
            recipe.user = faker.helpers.arrayElement(users);
            recipe.category = faker.helpers.arrayElement(categories);
            recipe.tags = faker.helpers.shuffle(tags).slice(0, 3);
            await recipeRepository.save(recipe);
        }));
    }
}