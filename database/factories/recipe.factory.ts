import { Faker } from '@faker-js/faker'
import { RecipeEntity } from 'src/recipes/recipe.entity';
import { setSeederFactory } from 'typeorm-extension'
import { source } from 'database/config/typeorm.config';
import { CategoryEntity } from 'src/categories/category.entity';
import { UserEntity } from 'src/users/user.entity';

export const RecipesFactory = setSeederFactory(RecipeEntity, async (faker: Faker) => {
    const recipe = new RecipeEntity();

    const categoryRepo = source.getRepository(CategoryEntity);
    const ramdonCategory = await categoryRepo.findOne({ order: { id: 'ASC' } });

    const userRepo = source.getRepository(UserEntity);
    const ramdonUser = await userRepo.findOne({ order: { id: 'ASC' } });

    recipe.title = faker.lorem.words(3);
    recipe.description = faker.lorem.words(10);
    recipe.ingredients = faker.lorem.words(10);
    recipe.directions = faker.lorem.words(10);
    recipe.image = faker.image.url();
    recipe.category = ramdonCategory;
    recipe.user = ramdonUser;

    return recipe;
});