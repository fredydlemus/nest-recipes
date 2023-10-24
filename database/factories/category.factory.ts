import { Faker } from '@faker-js/faker'
import { CategoryEntity } from 'src/categories/category.entity'
import { setSeederFactory } from 'typeorm-extension'

export const CategoriesFactory = setSeederFactory(CategoryEntity, (faker: Faker) => {
    const category = new CategoryEntity();

    category.name = faker.lorem.word();
    return category;
});