import { AxiosInstance, AxiosResponse } from 'axios';
import Entity from './Entity';

export default interface ResponseBody extends AxiosInstance {
  message: string;
  statusCode: number;
  data?: Entity | Array<Entity>;
}
