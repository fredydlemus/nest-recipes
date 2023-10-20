import { RecipeEntity } from "src/recipes/recipe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn('identity', {
        name: 'category_id',
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({ name: 'name', nullable: false, type: 'string' })
    name: string;

    @OneToMany(() => RecipeEntity, (recipe) => recipe.category)
    recipes: RecipeEntity[];
}