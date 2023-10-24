import { RecipeEntity } from "src/recipes/recipe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('identity', {
        name: 'user_id',
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({ name: 'name', nullable: false, type: 'text' })
    name: string;

    @Column({ name: 'email', nullable: false, type: 'text' })
    email: string;

    @Column({ name: 'password', nullable: false, type: 'text' })
    password: string;

    @OneToMany(() => RecipeEntity, (recipe) => recipe.user, {
        cascade: ['remove']
    })
    recipes: RecipeEntity[];
}