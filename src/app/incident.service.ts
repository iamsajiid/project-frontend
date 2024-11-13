import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncidentModel } from './Incident.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl: string; 
  userId: string | null = null;
  role: string | null = null;

  constructor(private http: HttpClient) {
    this.baseUrl = '';
    const token = localStorage.getItem("token")
    if(token){
      const decodedToken: any = jwtDecode(token)
      this.role = decodedToken.roles[0].authority.toLowerCase()
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
    this.baseUrl = `http://localhost:8080/${this.role}/${this.userId}`; 
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getIncidents(): Observable<IncidentModel[]> {
    return this.http.get<IncidentModel[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  addIncident(incident: IncidentModel): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add-inc`, incident, { 
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }

  deleteIncident(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, { 
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }

  updateIncident(id: number, incident: IncidentModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update-inc/${id}`, incident, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json'  // Tell Angular to expect plain text response
    });
  }

  downloadIncident(incId: number): Observable<Blob> {
    // console.log("Inside download service -- ");
    return this.http.get<Blob>(`${this.baseUrl}/download-report/${incId}`, {
      headers: this.getHeaders(),
      responseType: 'blob' as 'json'  // Specify that the response type is Blob
    });
  }

  updateStatus(incId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/resolve-inc/${incId}`, incId, { 
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
     });
    
  }

  addComment(incId: number, commentData: Object): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add-comment/${incId}`, commentData, { 
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }

  editComment(incId: number, commentData: Object): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/update-comment/${incId}`, commentData, { 
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }
  
  //hi  
  // bye
}
