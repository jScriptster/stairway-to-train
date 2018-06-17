import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Way } from '../model/way';

@Injectable()
export class WayService {

  private ways:Way[] = [];
  private createCounter:number = 0;
  private newWaySubject = new Subject<Way>();

  constructor() {
    this.create();
  }

  create():void {
    let way = new Way(this.getNextId(), 'Neue Route');
    this.ways.push(way);
    this.newWaySubject.next(way);
  }

  getWays(): Way[] {
    return this.ways;
  }

  getNextId():string {
    this.createCounter++;
    return `${this.createCounter}`;
  }

  getNewWayMessage(): Observable<Way> {
    return this.newWaySubject.asObservable();
  }

  getWayById(id):Way {
    return this.ways.find(el => {
      return el.id === id;
    });
  }

}
