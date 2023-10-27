export class ResourceDTO<T>{
    id: string | number;
    attributes: T;
    relations?: any;
}