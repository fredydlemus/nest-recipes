import { Expose, Transform } from "class-transformer";
import { CategoryEntity } from "src/categories/category.entity";
import { UserEntity } from "src/users/user.entity";

export class RecipeDto {

    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    ingredients: string;

    @Expose()
    directions: string;

    @Expose()
    image: string;

    @Expose()
    category: CategoryEntity;

    @Expose()
    user: UserEntity;

    @Expose()
    @Transform(({ obj }) => obj.tags.map(tag => tag.name).join(', '))
    tags: string;
}