import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  getAuthorizationToken() {
    return '[YOUR KEY]';
  }

}
