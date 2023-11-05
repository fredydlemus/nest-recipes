import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";
import { CategoryEntity } from "src/categories/category.entity";
import { TagEntity } from "src/tags/tag.entity";
import { UserEntity } from "src/users/user.entity";

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    ingredients: string;

    @IsString()
    @IsNotEmpty()
    directions: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    category: CategoryEntity;

    @IsNumber()
    @IsNotEmpty()
    user: UserEntity;
    tags: TagEntity[];
}
