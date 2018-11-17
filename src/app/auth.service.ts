import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1/app_dev.php/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getToken (username,password): Observable<any> {
    //console.log(JSON.stringify({username,password}));
    return this.http.post<any>(endpoint + 'login_check', JSON.stringify({username,password}), httpOptions).pipe(
      map(this.extractData));
  }

  isLoggedIn(){
    if(!localStorage.getItem('token')){
      return false;
    }else{
      return true;
    }
  }

  TokenNotExpired(){
    let date = new Date();
    let timestamp = (date.getTime()/1000 | 0);
    if(parseInt(localStorage.getItem('exp')) < timestamp ){
      return false;
    }
    return true;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
