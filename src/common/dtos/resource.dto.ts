export class ResourceDTO<T>{
    id: string | number;
    attributes: T;
    type: string;
    relations?: any;
}