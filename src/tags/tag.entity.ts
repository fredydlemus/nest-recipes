import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tag' })
export class TagEntity {
    @PrimaryGeneratedColumn('identity', {
        name: 'tag_id',
        generatedIdentity: 'ALWAYS',
    })
    id: number;

    @Column({ name: 'name', nullable: false, type: 'string' })
    name: string;
}