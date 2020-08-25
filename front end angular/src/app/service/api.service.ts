import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri:string = 'http://localhost:3000/users/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseUri1:string = `http://localhost:3000/users/live/n`;
  constructor(private http: HttpClient) { }

  // // Create
  // createEmployee(data): Observable<any> {
  //   let url = `${this.baseUri}/create`;
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // Get all employees
  getRecord() {
    return this.http.get(`${this.baseUri}`);
  }
  // getlive() {
  //   return this.http.get(`http://localhost:3000/users/live`);
  // }
  stop(){

    return this.http.get(`http://localhost:3000/users/live`);
  }
  tasweer(){
    return this.http.get(`http://localhost:5000/video_feed?s=1`);
  }
  signup(stuff){
    const maal=stuff;
    return this.http.post(`http://localhost:3000/users/signup`,maal);
  }
  signin(stuff){
    const maal=stuff;
    return this.http.post(`http://localhost:3000/users/login`,maal);
  }
  // Get employee
  // getEmployee(id): Observable<any> {
  //   let url = `${this.baseUri}/read/${id}`;
  //   return this.http.get(url, {headers: this.headers}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Update employee
  // updateEmployee(id, data): Observable<any> {
  //   let url = `${this.baseUri}/update/${id}`;
  //   return this.http.put(url, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Delete employee
  // deleteEmployee(id): Observable<any> {
  //   let url = `${this.baseUri}/delete/${id}`;
  //   return this.http.delete(url, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
