import { Injectable } from '@angular/core';
import { User } from './user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
user: User;
isLogged = false;
constructor(private route: Router) {
  const token = localStorage.getItem('usertoken');
  const storage = !!token ? localStorage : sessionStorage;
  this.user = {
    id: +storage.getItem('userid'),
    username: storage.getItem('username'),
    token: token || storage.getItem('usertoken')
  };
  this.isLogged = !!this.user.token;

}

get isLoggedIn(): boolean {
  return this.isLogged || !!localStorage.getItem('usertoken');
}

public getUser() {

}

signIn(user: User, rememberme: boolean) {
  this.user = user;
  const storage = rememberme ? localStorage : sessionStorage;
  storage.setItem('usertoken', user.token);
  storage.setItem('username', user.username);
  storage.setItem('userid', user.id + '');
  this.isLogged = true;
  // TODO: Later, user permissions and more info
}

signout() {
  localStorage.removeItem('usertoken');
  localStorage.removeItem('username');
  localStorage.removeItem('userid');
  sessionStorage.removeItem('usertoken');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('userid');
  this.isLogged = false;
  this.route.navigate(['home']);

}

}
