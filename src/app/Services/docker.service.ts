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
  BackUp():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/BackUp`);
  }
  DockerUp():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/DockerUp`);
  }
  DockerLogs(Logs : {containerName:String}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/DockerLogs`,Logs);
  }
  MonitoringImages():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/MonitoringImages`);
  }

  NewRuta(data:{NmaeRuta:String,dockerName:String}): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/NewRuta`,data);
  }
  DockerWeb(dockerWebForm:{NombreContenedor:any,image:any,volumnes:any,dockerName:any }): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/NewDockerWeb`,dockerWebForm);
  }
}
