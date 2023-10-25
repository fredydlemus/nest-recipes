import { Controller, Get, Param } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "src/tags/tag.entity";

@Controller('tags')
export class TagController {

    constructor(@InjectRepository(TagEntity) private _tagRep: Repository<TagEntity>) { }

    @Get()
    index(): Promise<TagEntity[]> {
        return this._tagRep.find();
    }

    @Get('/:tag')
    show(@Param('tag') tag: string): Promise<TagEntity> {
        const id = parseInt(tag);
        return this._tagRep.findOne({ where: { id } });
    }

}