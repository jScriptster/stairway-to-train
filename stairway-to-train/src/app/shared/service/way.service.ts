import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Way } from '../model/way';
import { Station } from '../model/station';
import { PersistenceService } from './persistence.service';
import { ISubscription } from 'rxjs/Subscription';
import { element } from 'protractor';

@Injectable()
export class WayService {

  private ways:Way[] = [];
  private newWaySubject:Subject<Way> = new Subject<Way>();
  private killWaySubject:Subject<Way> = new Subject<Way>();
  private readySubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private persistenceServcie:PersistenceService) {

    let fetchAllObservable:Observable<boolean> = this.persistenceServcie.fetchAll('ways'); 

    if (fetchAllObservable) {
      let subscription:ISubscription = fetchAllObservable.subscribe((result) => {
        subscription.unsubscribe();
        result['records'].forEach(record => {
          let way = new Way(record.id, record.name, record.stations);
          this.ways.push(way);
        });
        this.readySubject.next(true); 
      });
    } else {
      this.readySubject.next(true);   
    }
  }

  create():void {
    let way = new Way(this.getNextId());
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
    let newId = Math.floor(10000 * Math.random()) + 10000;
    let uniqueCheck = this.ways.filter((element) => {
      return element.id === `${newId}`;
    });
    if (uniqueCheck.length > 0) {
      return this.getNextId();
    }
    return `${newId}`;
  }

  getReady():Observable<boolean> {
    return this.readySubject.asObservable();
  }

  getNewWayMessage():Observable<Way> {
    return this.newWaySubject.asObservable();
  }

  getKillWayMessage():Observable<Way> {
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
