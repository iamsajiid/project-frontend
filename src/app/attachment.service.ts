import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private baseUrl: string; 
  incId: string | null = null;
  userId: string | null = null;

  constructor(private http: HttpClient) {
    this.baseUrl = ''; 
  }

  setUserId(userId: string) {
    this.userId = userId;
    // console.log("in attachment service UserId --", this.userId)
  }

  setIncId(incId: string) {
    this.incId = incId;
    // console.log("in attachment service incId --", this.incId)
    // console.log("in attachment service userId --", this.userId)
    this.baseUrl = `http://localhost:8080/user/${this.userId}/update-inc/${this.incId}`; 
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  uploadFile(incidentId: string, file: File): Observable<any> {
    if (!this.userId) {
      throw new Error('User ID is not set');
    }

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<string>(`http://localhost:8080/user/${this.userId}/add-inc/${incidentId}/upload`,
      formData, {
        headers: this.getHeaders(),
        responseType: 'text' as 'json'
    });

    // const uploadReq = new HttpRequest(
    //   'POST',
    //   `http://localhost:8080/user/${this.userId}/add-inc/${incidentId}/upload`, // Adjust your endpoint
    //   formData,
    //   {
    //     headers: this.getHeaders(),
    //     reportProgress: true,
    //   }
    // );

    // return this.http.request(uploadReq);
  }


}
