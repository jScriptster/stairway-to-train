import { Injectable } from '@angular/core';
import { canIUseIndexedDbDecorator } from '../decorator/canIUseIndexedDbDecorator';

@Injectable()
export class PersistenceService {

  constructor() { }

  @canIUseIndexedDbDecorator()
  save(obj:any) {
    console.log('save', obj);
  }

  @canIUseIndexedDbDecorator()
  kill(obj:any) {
    console.log('kill', obj);
  }

}
