import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  status = false;
  public name: any;
  public searchname: any;
  constructor() {}
  getUserDetails() {}
  setLoggedIn(value: boolean) {
    this.status = value;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
}
