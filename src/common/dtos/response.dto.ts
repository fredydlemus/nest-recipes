import { ResourceDTO } from './resource.dto';

export class ResponseDTO<T> {
  data: ResourceDTO<T>[] | ResourceDTO<T>;
}
