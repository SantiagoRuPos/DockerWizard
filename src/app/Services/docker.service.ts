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
  DockerMysql(dockerMysqlPhpmyadminForm:{NombreContenedor:any,image:any,MYSQL_DATABASE:any,MYSQL_USER:any,MYSQL_PASSWORD:any,MYSQL_ROOT_PASSWORD:any,volumenes:any,dockerName:any,NombreContenedorPHPmyadmin:any,imagePHPmyadmin:any,dockerNamephpmyadmin:any,PMA_HOST:any,depends_on:any}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/DockerBd`,dockerMysqlPhpmyadminForm);
  }
  DockerWebMysql(dockerWebMysqlForm:{NombreContenedorWEB:any,image:any,volumenesWEB:any, dockerNameWEB:any, linksWEB:any, NombreContenedorMYSQL:any, imageMYSQL:any,MYSQL_DATABASE:any, MYSQL_USER:any,MYSQL_PASSWORD:any,MYSQL_ROOT_PASSWORD:any,volumenesMYSQL:any, dockerNameMYSQL:any, NombreContenedorPHPmyadmin:any, imagePHPmyadmin:any, dockerNamephpmyadmin:any,PMA_HOST:any,depends_on:any }):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/DockerWebBd`,dockerWebMysqlForm);
  }
  DockerRestart(nombreContenedor:any): Observable <any>{
    const body = { nombreContenedor }; // Asegúrate de que el cuerpo tenga la estructura que el servidor espera
    return this.http.post<any>(`${this.apiUrl}/DockerRestart`, body);
  }
  UpdatesContenedores(nombreContenedor:any): Observable <any>{
    const body = { nombreContenedor }; 
    return this.http.post<any>(`${this.apiUrl}/UpdateContenedores`,body);
  }
}
