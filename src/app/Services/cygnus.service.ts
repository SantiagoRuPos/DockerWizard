import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class CygnusService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {}

  NewUserCygnus(Data : {Nombre_Usuario_Cygnus:String,Password_Usuario:string}): Observable <any>{
    return this.http.post<any>(`${this.apiUrl}/NewUserCygnus`,Data);
  }
  ListUserCygnus():Observable <any>{
    return this.http.get<any>(`${this.apiUrl}/ListUserCygnus`);
  }
  ProcessCygnus():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/ProcessCygnus`);
  }
  monitorUsers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/MonitorUserCygnus`);

  }
}
