import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/tags/tag.entity';
import { FormatResponseInterceptor } from 'src/common/interceptors/format-response.interceptor';

@Controller('tags')
@UseInterceptors(FormatResponseInterceptor)
export class TagController {
  constructor(
    @InjectRepository(TagEntity) private _tagRep: Repository<TagEntity>,
  ) { }

  @Get()
  index(): Promise<TagEntity[]> {
    return this._tagRep.find({ relations: ['recipes'] });
  }

  @Get('/:tag')
  show(@Param('tag') tag: string): Promise<TagEntity> {
    const id = parseInt(tag);
    return this._tagRep.findOne({ where: { id }, relations: ['recipes'] });
  }
}
