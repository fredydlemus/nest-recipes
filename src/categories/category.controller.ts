import { Controller, Get, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/categories/category.entity";
import { Repository } from "typeorm";
import { plainToInstance } from 'class-transformer';

@Controller('categories')
export class CategoryController {

    constructor(@InjectRepository(CategoryEntity) private _categoryRep: Repository<CategoryEntity>) { }

    @Get()
    index(): Promise<CategoryEntity[]> {
        return this._categoryRep.find();
    }

    @Get('/:category')
    async show(@Param('category') categoryId: string): Promise<CategoryEntity> {
        const id = parseInt(categoryId);

        return this._categoryRep.findOne({ where: { id }, relations: ['recipes'] });
    }
}