import { Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RecipeEntity } from "src/recipes/recipe.entity";

@Controller('recipes')
export class RecipeController {

    constructor(@InjectRepository(RecipeEntity) private _recipeRep: Repository<RecipeEntity>) { }

    @Get()
    index(): Promise<RecipeEntity[]> {
        return this._recipeRep.find({ relations: ['category', 'tags', 'user'] });
    }

    @Get('/:recipe')
    show(@Param('recipe') recipe: string): Promise<RecipeEntity> {
        const id = parseInt(recipe);
        return this._recipeRep.findOne({ where: { id }, relations: ['category', 'tags', 'user'] });
    }

    @Post()
    store() { }

    @Put()
    update() { }

    @Delete()
    destroy() { }

}