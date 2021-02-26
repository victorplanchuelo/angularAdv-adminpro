import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient) {
      this.googleInit();
   }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '724065098875-3ilmtqdum5vifkuqdj3hm6kqcskatp25.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map((resp: any) => true),
      catchError( err => of(false) )
    );
  }

  crearUsuario(formData: RegisterForm): Observable<any> {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login(formData: LoginForm) {

    localStorage.removeItem('email');

    if (formData.remember) {
      localStorage.setItem('email', formData.email);
    }

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        map( (resp: any) => {
          console.log('resp', resp);
          localStorage.setItem('id', resp.id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));

          return true;
        })
      );
  }

  loginGoogle(token: string) {

    localStorage.removeItem('email');

    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        map( (resp: any) => {
          localStorage.setItem('token', resp.token);
          return true;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }
}
