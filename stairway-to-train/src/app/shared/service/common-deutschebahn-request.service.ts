import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CommonDeutschebahnRequestService {

  private DOMAIN = 'https://api.deutschebahn.com';

  constructor(private http: HttpClient) {}

  get(resource, params) {
    let httpParamsFromObject = new HttpParams({
      fromObject: params
    });
    return this.fetch('GET', resource, httpParamsFromObject);
  }

  private fetch(method, ressource, params) {
    const req = new HttpRequest(method, `${this.DOMAIN}/${ressource}`, {
      params
    });

    return this.http.request(req);
  }

}
