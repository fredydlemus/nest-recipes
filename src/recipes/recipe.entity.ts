import { CategoryEntity } from 'src/categories/category.entity';
import { UserEntity } from 'src/users/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'recipe' })
export class RecipeEntity {
    @PrimaryGeneratedColumn('identity', {
        name: 'recipe_id',
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({ name: 'title', nullable: false, type: 'string' })
    title: string;

    @Column({ name: 'description', nullable: false, type: 'text' })
    description: string;

    @Column({ name: 'ingredients', nullable: false, type: 'text' })
    ingredients: string;

    @Column({ name: 'directions', nullable: false, type: 'text' })
    directions: string;

    @Column({ name: 'image', nullable: true, type: 'string' })
    image: string;

    @ManyToOne(() => CategoryEntity, (category) => category.recipes, {
        cascade: ['remove'],
    })
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToOne(() => UserEntity, (user) => user.recipes, {
        cascade: ['remove'],
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
