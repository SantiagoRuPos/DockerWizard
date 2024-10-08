import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CygnusService {
  private apiUrl = 'http://localhost:9000'; // Cambia esto por la URL de tu backend

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
  ResetPasswordCygnus(Data : {Nombre_Usuario_Cygnus:String,Password_Usuario:string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ResetPasswordCygnus`,Data);
  }
  AsignarPermiso(Data : {Nombre_Usuario_Cygnus:String,Grupo_Cygnus:string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/PermisosCygnus`,Data);
  }
  QuitarPermiso(Data : {Nombre_Usuario_Cygnus:String,Grupo_Cygnus:string}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/QuitarPermiso`,Data);
  }

  searchReportes(params: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/searchReports`,params);
  }
  newReport(Data : {Nombre_Reporte:String,Descripcion_Reporte:String,Nivel_Reporte:String,Usuario_Registrador_Reporte:String, Correo_Institucional_Usuario:string}):Observable <any> {
    return this.http.post<any>(`${this.apiUrl}/NewReport`,Data);
  }
  UpdateReport(updatedReportData:{Id_Reporte:string,Nivel_Reporte:String,Estado_Reporte:String,Usuario_Solucionador_Reporte:String,Comentarios_Reporte:String,Correo_Institucional_Usuario:string}):Observable <any> {
    return this.http.post<any>(`${this.apiUrl}/ReportUpdate`,updatedReportData);
  }
}
