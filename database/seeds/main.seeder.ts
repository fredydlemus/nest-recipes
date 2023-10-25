import { DataSource } from "typeorm";
import { UserEntity } from "../../src/users/user.entity";
import { Seeder, SeederFactoryManager, runSeeders } from "typeorm-extension";
import { CategoryEntity } from "../../src/categories/category.entity";
import { RecipeEntity } from "../../src/recipes/recipe.entity";
import { TagEntity } from "../../src/tags/tag.entity";

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

        const recipeRepository = dataSource.getRepository(RecipeEntity);
        const userRepo = dataSource.getRepository(UserEntity);
        const categoryRepo = dataSource.getRepository(CategoryEntity);

        const categories = await categoryRepo.find();
        const ramdonCategory = categories.sort(() => Math.random() - Math.random())[0];
        const users = await userRepo.find();
        const ramdonUser = users.sort(() => Math.random() - Math.random())[0];

        const userFactory = factoryManager.get(UserEntity);
        const categoryFactory = factoryManager.get(CategoryEntity);
        const recipeFactory = factoryManager.get(RecipeEntity);
        const tagFactory = factoryManager.get(TagEntity);

        await categoryFactory.saveMany(12);
        await userFactory.saveMany(29);
        const recipes = await recipeFactory.saveMany(100, { user: ramdonUser, category: ramdonCategory });
        const tags = await tagFactory.saveMany(40);

        //Many to Many
        recipes.forEach(async (recipe) => {
            const randomTags = tags.sort(() => Math.random() - Math.random()).slice(0, 3);
            recipe.tags = randomTags;
            await recipeRepository.save(recipe);
        });

    }
}