import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**@class BaseService
 * Extend your services
 */
export class BaseService {
  apiUrl = environment.apiUrl;
  // TODO: check if , httpOptions is applicable to all http requests.
  constructor(public http: HttpClient, public baseUrl: string ) {}

  // TODO: Warn request without limit param.
  get<T>(httpOptions?: {}, baseUrl = this.baseUrl): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + baseUrl, httpOptions )
    .pipe(map( val => {
      if ( val && val['results'] ) {
        return val['results'];
      }
      return val;
    }));
  }

  getById<T>(id: number, httpOptions?: {}, baseUrl = this.baseUrl): Observable<T> {
    return this.http.get<T>(this.apiUrl + this.baseUrl + '/' + id, httpOptions);
  }

  post<T>(body: any, httpOptions?: {}, baseUrl = this.baseUrl): Observable<T> {
    return this.http.post<T>(this.apiUrl + baseUrl, body, httpOptions);
  }

  update<T>(body: any, httpOptions?: {}, baseUrl = this.baseUrl): Observable<T> {
    return this.put<T>(body, httpOptions, baseUrl);
  }

  create<T>(body: T, httpOptions?: {}, baseUrl = this.baseUrl): Observable<T> {
    return this.post<T>(body, httpOptions, baseUrl);
  }

  put<T>(body: T, httpOptions?: {}, baseUrl = this.baseUrl): Observable<T> {
    return this.http.put<T>(this.apiUrl + baseUrl, body, httpOptions);
  }

  delete<T>(id: number, baseUrl = this.baseUrl): Observable<T> {
    return this.http.delete<T>(this.apiUrl + baseUrl + '/' + id );
  }

  patch<T>(body: any, httpOptions?: {}, baseUrl = this.baseUrl): Observable<T> {
    return this.http.patch<T>(this.apiUrl + baseUrl, body, httpOptions);
  }
}
