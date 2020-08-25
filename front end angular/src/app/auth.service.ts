import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
status=false;
  constructor() { }
  getUserDetails(){
    
  }
  setLoggedIn(value:boolean){
    this.status=value
  }
  get isLoggedIn(){
    return this.status
  }
}
