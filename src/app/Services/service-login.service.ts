import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  private apiUrl = 'http://localhost:9000'; // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {

  }
 



  login(credentials: { Nombre_Usuario: string, Password_Usuario: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          if (response && response.accessToken) {
            sessionStorage.setItem('accessToken', response.accessToken); // Almacenar en sessionStorage
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Error al iniciar sesión:', error);
          return of(false);
        })
      );
  }
  
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && sessionStorage) {
      return !!sessionStorage.getItem('accessToken'); // Verificar en sessionStorage
    } else {
      return false;
    }
  }
  
  logout(): void {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('accessToken'); // Eliminar de sessionStorage
    }
  }


  getUserInfo(Nombre_Usuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/userinfo`,{Nombre_Usuario});
  }
  registerUser(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-user`, newUser)
  }

  getUsersByName(Nombre_Usuario: string) {
    return this.http.post<any>(`${this.apiUrl}/ListarUsuario`, { Nombre_Usuario: Nombre_Usuario });
  }

  getAllUser():Observable <any>{
    return this.http.get<any>(`${this.apiUrl}/ListUsers`);

  }
  ResetPassword(resetPasswordForm:{Nombre_Usuario:String,Password_Usuario:String}):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/resetPassword`,resetPasswordForm);

  }

  UpdateStatusUser(Estado_Usuario: any, Nombre_Usuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/UpdateStatusUser`, { Estado_Usuario: Estado_Usuario, Nombre_Usuario: Nombre_Usuario });
  }
  
  RegisterNewProject(Infro: {Nombre_Proyecto:String,Nombre_Proyecto_Acronomio:String,Nombre_Usuario_Cygnus:String,Rol_Proyecto:any,Nombre_Lider_Proyecto:String,Telefono_Lider_Proyecto:String,Correo_Institucional_Lider:String,Cargo_Institucional:any,Programa_Academico_Proyecto:any,Semillero_Lider:String,Grupo_Investigacion:String,Usuario_Regsitrado_Proyecto:any}):Observable <any> {
    return this.http.post<any>(`${this.apiUrl}/NewProject`,Infro);
  }

  getProject(Nombre_Proyecto:String): Observable<any>{
    return this.http.post<any> (`${this.apiUrl}/ListProject`,{Nombre_Proyecto:Nombre_Proyecto});
  }
  getAllProjects():Observable<any> {
    return this.http.get <any>(`${this.apiUrl}/ListProjects`);
  }
  UpdateStatusProject(Estado_Proyecto:any,Nombre_Proyecto:string ):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/UpdateProject`, { Estado_Proyecto: Estado_Proyecto, Nombre_Proyecto: Nombre_Proyecto });

  }
}
