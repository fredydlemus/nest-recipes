import { CategoryEntity } from 'src/categories/category.entity';
import { TagEntity } from 'src/tags/tag.entity';
import { UserEntity } from 'src/users/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
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

    @ManyToOne(() => CategoryEntity, (category) => category.recipes)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToOne(() => UserEntity, (user) => user.recipes)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToMany(() => TagEntity, (tag) => tag.recipes, {
        cascade: ['remove'],
    })
    @JoinTable({
        name: 'recipe_tag',
        joinColumn: {
            name: 'recipe_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        }
    })
    tags: TagEntity[];
}
