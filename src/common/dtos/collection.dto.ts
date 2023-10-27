import { ResourceDTO } from "./resource.dto";

export class CollectionDTO<T>{
    data: ResourceDTO<T>[];
}