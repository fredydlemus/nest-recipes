import { Faker } from '@faker-js/faker'
import { RecipeEntity } from '../../src/recipes/recipe.entity';
import { setSeederFactory } from 'typeorm-extension'

export const RecipesFactory = setSeederFactory(RecipeEntity, async (faker: Faker) => {
    const recipe = new RecipeEntity();

    recipe.title = faker.lorem.words(3);
    recipe.description = faker.lorem.words(10);
    recipe.ingredients = faker.lorem.words(10);
    recipe.directions = faker.lorem.words(10);
    recipe.image = faker.image.url();

    return recipe;
});