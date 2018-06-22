import { Station } from './station';

export class Way {
  constructor(
    public id:string,
    public title:string = '',
    public stations:Station[] = []
   ) { }
}
