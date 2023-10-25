import { DataSource } from "typeorm";
import { UserEntity } from "../../src/users/user.entity";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CategoryEntity } from "../../src/categories/category.entity";
import { RecipeEntity } from "../../src/recipes/recipe.entity";
import { TagEntity } from "../../src/tags/tag.entity";

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

        const connection = dataSource.manager.connection;
        await connection.transaction(async manager => {

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
            await recipeFactory.saveMany(100);

            const recipes = await recipeRepository.find();

            await Promise.all(recipes.map(async (recipe) => {
                recipe.user = await userRepository.createQueryBuilder().orderBy("RANDOM()").getOne();
                recipe.category = await categoryRepository.createQueryBuilder().orderBy("RANDOM()").getOne();
                recipe.tags = await tagRepository.createQueryBuilder().orderBy("RANDOM()").limit(3).getMany();
            }));

            await recipeRepository.save(recipes);
        })
    }
}