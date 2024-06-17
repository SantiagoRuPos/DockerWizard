import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DockerService {
  private apiUrl = 'http://localhost:8991'; 
  constructor(private http: HttpClient) {}

  StateContainers():Observable <any>{
    return this.http.get<any>(`${this.apiUrl}/StateContainers`);
  }
}
