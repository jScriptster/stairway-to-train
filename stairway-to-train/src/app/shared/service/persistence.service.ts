import { Injectable } from '@angular/core';
import { canIUseIndexedDbDecorator } from '../decorator/canIUseIndexedDbDecorator';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PersistenceService {

   private PRESETS = [
    {
      IDENTIFIER: 'ways',
      DB_NAME: 'stt_ways',
      DB_VERSION: 1,
      DB_STORE_NAME: 'ways'
    }
  ];

  private databases = {};
  private fetchAllSubject:Subject<any> = new Subject();

  constructor() { }

  @canIUseIndexedDbDecorator()
  fetchAll(presetIdentifier='ways'):Observable<any> {
    const preset = this.getDbPreset(presetIdentifier);
    this.init(preset, this.getAll, [preset]);  
    return this.fetchAllSubject.asObservable();
  }

  @canIUseIndexedDbDecorator()
  save(obj:any, presetIdentifier='ways') {
    console.log('save', obj);
    const preset = this.getDbPreset(presetIdentifier);
    this.init(preset, this.addOrUpdate, [preset, obj]);
  }

  @canIUseIndexedDbDecorator()
  kill(obj:any, presetIdentifier='ways') {
    console.log('kill', obj);
    const preset = this.getDbPreset(presetIdentifier);
    this.init(preset, this.delete, [preset, obj.id]);
  }

  private init(preset, successCallback, successParams):boolean {
    if (this.databases[preset.IDENTIFIER]) {
      successCallback.apply(this, successParams);
      return;
    } 
    const request = indexedDB.open(preset.DB_NAME, preset.DB_VERSION);
    request.onerror = (event) => {
      console.error(event);
    };

    request.onsuccess = (event) => {
      this.databases[preset.IDENTIFIER] = request.result;
      successCallback.apply(this, successParams);
    };

    request.onupgradeneeded = (event) => { 
      let db = event.target['result'];
      let objectStore = db.createObjectStore(preset.DB_STORE_NAME, { keyPath: "id" });
      //objectStore.createIndex("name", "name", { unique: false });
    };
  }

  private getDbPreset(presetIdentifier) {
    const result  = this.PRESETS.filter((element) => {
      return element.IDENTIFIER === presetIdentifier;
    });
    return result[0];
  }

  private getObjectStore(preset, mode='readwrite') {
    var tx = this.databases[preset.IDENTIFIER].transaction(preset.DB_STORE_NAME, mode);
    return tx.objectStore(preset.DB_STORE_NAME);
  }

  private addOrUpdate(preset, data) {
    const objectStore = this.getObjectStore(preset);
    const readRequest = objectStore.get(data.id);

    readRequest.onsuccess = () => {
      let result = readRequest.result;
      let writeRequest;
      if (result) {
        writeRequest = objectStore.put(data);
      } else {
        writeRequest = objectStore.add(data);
      }
      writeRequest.onsuccess = () => {
        console.log('put or add');
      };
    };

    readRequest.onerror = function() {
      console.log('err');  
    }
  }

  private getAll(preset) {
    const objectStore = this.getObjectStore(preset);
    const result = {
      identifier: preset.IDENTIFIER,
      records: []
    };

    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        result.records.push(cursor.value);
        cursor.continue();
      } else {
        this.fetchAllSubject.next(result);
      }
    };
  }

  private delete(preset, id) {
    const objectStore = this.getObjectStore(preset);
    const request = objectStore.delete(id);
    request.onsuccess = function(event) {
      console.log('delete');
    };
  }
}
