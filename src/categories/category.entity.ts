import { RecipeEntity } from '../recipes/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn('identity', {
        name: 'category_id',
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({ name: 'name', nullable: false, type: 'text' })
    name: string;

    @OneToMany(() => RecipeEntity, (recipe) => recipe.category, {
        cascade: ['remove'],
    })
    recipes: RecipeEntity[];
}
