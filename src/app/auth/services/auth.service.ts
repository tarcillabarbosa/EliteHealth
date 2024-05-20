import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.API_URL}/auth`;
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        })
      );
  }
 
  register(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
