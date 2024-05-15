import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { SignupRequestPayload } from '../signup/signup-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: string = 'http://localhost:8080/api/auth';

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/signup`, signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<Boolean> {
    localStorage.removeItem('authenticationToken');
    return this.httpClient
      .post<LoginResponse>(`${this.BASE_URL}/login`, loginRequestPayload)
      .pipe(
        map(data => {
          localStorage.setItem('authenticationToken', data.authenticationToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('expiresAt', data.expiresAt.toString());
          localStorage.setItem('username', data.username);

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        }),
        catchError(err => {
          if (err.status === 401) {
            return of(false);
          }
          return throwError(err);
        })
      );
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };

    return this.httpClient.post<LoginResponse>(`${this.BASE_URL}/refresh/token`, refreshTokenPayload)
      .pipe(tap(response => {
        localStorage.setItem('authenticationToken', response.authenticationToken);
        localStorage.setItem('expiresAt', response.expiresAt.toString());
      }));
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  getExpirationTime() {
    return localStorage.getItem('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };

    this.httpClient.post(`${this.BASE_URL}/logout`, refreshTokenPayload, { responseType: 'text' })
      .subscribe((data) => {
        console.log(data);
      }, (error) => {
        throwError(error);
      }
      );
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
  }
}
