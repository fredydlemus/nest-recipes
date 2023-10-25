import { Faker } from "@faker-js/faker";
import { UserEntity } from "../../src/users/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const UsersFactory = setSeederFactory(UserEntity, async (faker: Faker) => {
    const user = new UserEntity();

    user.name = faker.person.firstName();
    user.email = 'test@test.com';
    user.password = faker.internet.password();

    return user;
})