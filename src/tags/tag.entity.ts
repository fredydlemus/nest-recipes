import { RecipeEntity } from '../recipes/recipe.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn('identity', {
    name: 'tag_id',
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ name: 'name', nullable: false, type: 'text' })
  name: string;

  @ManyToMany(() => RecipeEntity, (recipe) => recipe.tags)
  recipes: RecipeEntity[];
}
