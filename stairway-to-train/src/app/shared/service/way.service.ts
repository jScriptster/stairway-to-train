import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Way } from '../model/way';
import { Station } from '../model/station';
import { PersistenceService } from './persistence.service';

@Injectable()
export class WayService {

  private ways:Way[] = [];
  private createCounter:number = 0;
  private newWaySubject:Subject<Way> = new Subject<Way>();
  private killWaySubject:Subject<Way> = new Subject<Way>();

  constructor(private persistenceServcie:PersistenceService) {
    this.create();
  }

  create():void {
    let way = new Way(this.getNextId(), 'Neue Route');
    this.ways.push(way);
    this.newWaySubject.next(way);
    this.save(way.id);
  }

  kill(wayId:string):void {
      const way = this.getWayById(wayId);
      this.ways = this.ways.filter((element) => {
        return element.id !== wayId;    
      });
      this.killWaySubject.next(way);
      this.persistenceServcie.kill(way);
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

  getKillWayMessage(): Observable<Way> {
    return this.killWaySubject.asObservable();
  }

  getWayById(id):Way {
    return this.ways.find(el => {
      return el.id === id;
    });
  }

  addStation(wayId:string, station:Station) {
    const way = this.getWayById(wayId);
    way.stations.push(station);
    this.save(wayId);
  }

  removeStation(wayId:string, station:Station) {
    const way = this.getWayById(wayId);
    way.stations = way.stations.filter(function(element) {
      return element.id !== station.id;
    });
    this.save(wayId);
  }

  save(wayId:string) {
    const way = this.getWayById(wayId);
    this.persistenceServcie.save(way);
  }

}
