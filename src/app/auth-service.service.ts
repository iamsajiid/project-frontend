import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import  * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com';  // Replace with actual backend API URL

  constructor(private http: HttpClient) {}

  // Login API call for users
  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/user/login`, credentials);
  }

  // Login API call for admins
  loginAdmin(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/admin/login`, credentials);
  }

  // Register API call
  register(data: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // Decode JWT token to get user/admin ID
  decodeToken(token: string): any {
    return jwt_decode(token);
}
  // Get the current user's ID from the JWT token
  getCurrentUserId(): number|null {
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT in local storage
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return decodedToken.userId; // Adjust this based on how your token is structured
    }
    return null; // or handle as appropriate if there's no token
  }
}


