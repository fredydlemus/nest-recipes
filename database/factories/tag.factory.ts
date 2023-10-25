import { Faker } from '@faker-js/faker'
import { TagEntity } from '../../src/tags/tag.entity';
import { setSeederFactory } from 'typeorm-extension'

export const TagsFactory = setSeederFactory(TagEntity, (faker: Faker) => {
    const tag = new TagEntity();

    tag.name = faker.lorem.word();
    return tag;
});