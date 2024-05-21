// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, tap } from 'rxjs';
// import { User } from '../models/user.model';
// import { environment } from '../../../environments/environment.development';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private authUrl = `${environment.API_URL}/auth`;
//   private tokenKey = 'auth-token';

//   constructor(private http: HttpClient, private router: Router) { }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<{ token: string }>(`${this.authUrl}/login`, { email, password })
//       .pipe(
//         tap(response => {
//           if (response.token) {
//             localStorage.setItem(this.tokenKey, response.token);
//           }
//         })
//       );
//   }
 
//   register(user: User): Observable<any> {
//     return this.http.post(`${this.authUrl}/register`, user);
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem(this.tokenKey);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Constants } from '../../commons/constants/constants.enum';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/user-credentials.model';
import { AuthenticatedUser } from '../models/authenticated-user.model';
// import {
//   UserRole,
// } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private _user: User | null = null;

  private _isLoggedIn: boolean = false;

  apiUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  private readTokens(): void {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    this._isLoggedIn = !!token;
    const userInfoString = localStorage.getItem(Constants.USER_INFO);
    this._user = userInfoString ? JSON.parse(userInfoString) : null;
  }

  private deleteTokens(): void {
    localStorage.removeItem(Constants.TOKEN_KEY);
    localStorage.removeItem(Constants.USER_INFO);
  }

  register(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/register', user);
  }

  login(credentials: UserCredentials): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(this.apiUrl + '/login', credentials);
  }

  logout(): void {
    this.deleteTokens();
    this.readTokens();
    this.router.navigate(['auth', 'login']);
  }

  getUser(): User | null {
    this.readTokens();
    return this._user;
  }

  isLoggedIn(): boolean {
    this.readTokens();
    return this._isLoggedIn;
  }

  isAdmin() {
    return this._user?.role === UserRole.ADMIN;
  }
}
