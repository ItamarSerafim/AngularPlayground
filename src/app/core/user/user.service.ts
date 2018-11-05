import { Injectable } from '@angular/core';
import { DexieService } from '../dexie.service';
import { Dexie } from 'dexie';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

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
  constructor( http: HttpClient) {
    super(http, 'users');
  }

  register(user: User) {
      return this.http.post(`/users/register`, user);
  }
}
