import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = URL_SERVICIOS;
  }

  login(username: string, password: string) {
    return this._http.post<any>(`${this.url}/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log(user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log('user.menu :', user.menu);
          localStorage.setItem('menu', JSON.stringify(user.menu));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('menu');
  }

  loginAsociado(username: string, password: string) {
    return this._http.post<any>(`${this.url}/asociado/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentAsociado', JSON.stringify(user));
          localStorage.setItem('menu', JSON.stringify(user.menu));
        }
        return user;
      }));
  }

  recoverPassword(email: string, tipo: string) {
    const json = JSON.stringify({ email: email, type: tipo });
    const params = json;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<any>(this.url + 'forgot', params, { headers: headers });
  }

  changePassword(token: string, tipo: string, pwd: string) {
    const json = JSON.stringify({ tipo: tipo, password: pwd });
    const params = json;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<any>(this.url + 'reset/' + token, params, { headers: headers });
  }

  logoutAsociado() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentAsociado');
    localStorage.removeItem('menu');
  }
}
