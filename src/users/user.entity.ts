import { RecipeEntity } from "src/recipes/recipe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('identity', {
        name: 'user_id',
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({ name: 'name', nullable: false, type: 'string' })
    name: string;

    @OneToMany(() => RecipeEntity, (recipe) => recipe.user, {
        cascade: ['remove']
    })
    recipes: RecipeEntity[];
}