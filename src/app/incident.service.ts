import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incident } from './incidents';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseURL="hhtp;//localhost:8080/api/v1/incidents";

  constructor(private httpClient:HttpClient) { }

  getIncidentList():Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.baseURL}`);
  }
  createIncident(Incident:Incident):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,Incident);
  }

  getIncidentById(id:number):Observable<Incident>{
    return this.httpClient.get<Incident>(`${this.baseURL}/${id}`);
  }

  updateIncident(id:number,Incident:Incident):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,Incident);
  }

  deleteIncident(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
