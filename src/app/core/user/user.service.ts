import { Injectable } from '@angular/core';
import { DexieService } from '../dexie.service';
import { Dexie } from 'dexie';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export default class UserService extends BaseService {
  //  constructor(private http: HttpClient, public baseUrl: string ) {}
  public isAuthenticated = false;
  constructor( http: HttpClient) {
    super(http,  'Users');
  }

  register(user: User) {
    return this.post(user);
  }

  login(user: User): Observable<any> {
    return this.post(user, {}, this.baseUrl + '/login');
    // .pipe(tap((response) => {
    //   // Should I use sessionService here?
    //   return of(response);
    // }));
  }
}

/*
{
  "realm": "admin",
  "username": "user001",
  "email": "user001@hotmail.com",
  "emailVerified": false,
  "id": 1
}


Response from user login:
{
  "id": "qm0JuFZtozDDcYkwSmVYdhehEfnuGwWy86SlX2Lr2tV2tEOBbiDp5jQbGhkSG5V2", //This is the token
  "ttl": 1209600,
  "created": "2019-02-09T23:51:04.805Z",
  "userId": 1
}
*/
