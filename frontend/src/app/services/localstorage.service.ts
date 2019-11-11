import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  private token = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));

  constructor() { }

  editUser(User) {
    localStorage.setItem('user', JSON.stringify(User));
    this.user.next(User);
  }

  editToken(Token) {
    localStorage.setItem('token', JSON.stringify(Token));
    this.token.next(Token);
  }

  removeUser() {
    localStorage.removeItem('user');
    // this.user.next(User);
  }

  removeToken() {
    localStorage.removeItem('token');
    // this.token.next(Token);
  }

}
