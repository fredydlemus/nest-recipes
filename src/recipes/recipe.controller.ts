import { Controller, Get, Param } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RecipeEntity } from "src/recipes/recipe.entity";

@Controller('recipes')
export class RecipeController {

    constructor(@InjectRepository(RecipeEntity) private _recipeRep: Repository<RecipeEntity>) { }

    @Get()
    index(): Promise<RecipeEntity[]> {
        return this._recipeRep.find();
    }

    @Get('/:recipe')
    show(@Param('recipe') recipe: string): Promise<RecipeEntity> {
        const id = parseInt(recipe);
        return this._recipeRep.findOne({ where: { id } });
    }

}