import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// auth.service.ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: { id: number; username: string; role: string } | null = null;

  private apiUrl = 'http://localhost:8080/api/auth'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password });
  }
  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  getCurrentUser() {
    return this.currentUser;
  }
  logout() {
    console.log("Logout")
  }
}
