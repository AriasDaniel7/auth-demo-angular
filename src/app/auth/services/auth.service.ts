import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interfaces/login.interface';
import { LoginResponse } from '../interfaces/login-response';
import { catchError, map, of, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;
  private readonly TOKEN_KEY = 'token';
  private _authStatusLogin = signal<AuthStatus>(AuthStatus.checking);

  public authStatusLogin = computed(() => this._authStatusLogin());

  constructor(private http: HttpClient) {
    this.checkToken().subscribe();
  }

  login(login: Login) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, login)
      .pipe(
        map((loginResponse) => this.setAuthentication(loginResponse)),
        catchError((err) => {
          this.logout();
          return throwError(() => err.error);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._authStatusLogin.set(AuthStatus.notAuthenticated);
  }

  getUser() {
    const url = `${this.API_URL}/auth/user`;
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token) {
      this.logout();
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${url}`, { headers });
  }

  getUserAll() {
    const url = `${this.API_URL}/auth/users`;

    return this.http.get<User[]>(`${url}`).pipe(catchError(() => of([])));
  }

  checkToken() {
    const url = `${this.API_URL}/auth/check`;
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LoginResponse>(url, { headers }).pipe(
      map((loginResponse) => this.setAuthentication(loginResponse)),
      catchError(() => {
        this._authStatusLogin.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  private setAuthentication(loginResponse: LoginResponse) {
    this._authStatusLogin.set(AuthStatus.authenticated);
    localStorage.setItem(this.TOKEN_KEY, loginResponse.token);
    return true;
  }
}
