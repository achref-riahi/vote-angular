import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1/app_dev.php/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization' : 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root',
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getArticles(): Observable<any> {
  return this.http.get(endpoint + 'articles').pipe(
    map(this.extractData));
  }

  getArticle(id): Observable<any> {
    return this.http.get(endpoint + 'articles/' + id).pipe(
      map(this.extractData));
  }

  addArticle (article): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+localStorage.getItem("token"));
    return this.http.post<any>(endpoint + 'articles', JSON.stringify(article), httpOptions).pipe(
      tap((article) => console.log(`added article w/ id=${article.id}`)),
      catchError(this.handleError<any>('addArticle'))
    );
  }

  updateArticle (id, article): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+localStorage.getItem("token"));
    return this.http.patch(endpoint + 'articles/' + id, JSON.stringify(article), httpOptions).pipe(
      tap(_ => console.log(`updated article id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  deleteArticle (id): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+localStorage.getItem("token"));
    return this.http.delete<any>(endpoint + 'articles/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted article id=${id}`)),
      catchError(this.handleError<any>('deleteArticle'))
    );
  }

  async ArticleAuthorId(id){
     const response = await this.http.get(endpoint + 'articles/' + id).toPromise();
     return response;
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
