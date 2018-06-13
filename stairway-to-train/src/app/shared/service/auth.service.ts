import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  getAuthorizationToken() {
    return 'Bearer a07a0555aec5725bdfaa9ba281a0634d';
  }

}
