import { DataSource } from "typeorm";
import { UserEntity } from "src/users/user.entity";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CategoryEntity } from "src/categories/category.entity";
import { RecipeEntity } from "src/recipes/recipe.entity";
import { TagEntity } from "src/tags/tag.entity";

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

        const recipeRepository = dataSource.getRepository(RecipeEntity);

        const userFactory = factoryManager.get(UserEntity);
        const categoryFactory = factoryManager.get(CategoryEntity);
        const recipeFactory = factoryManager.get(RecipeEntity);
        const tagFactory = factoryManager.get(TagEntity);

        const users = await userFactory.saveMany(29);
        const categories = await categoryFactory.saveMany(12);
        const recipes = await recipeFactory.saveMany(100);
        const tags = await tagFactory.saveMany(40);

        //Many to Many
        recipes.forEach(async (recipe) => {
            const randomTags = tags.sort(() => Math.random() - Math.random()).slice(0, 3);
            recipe.tags = randomTags;
            await recipeRepository.save(recipe);
        });
    }
}