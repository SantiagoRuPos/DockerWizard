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
  private apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {

  }
  listarImagenesDocker(): Observable<any> {
    return this.http.get('http://localhost:3000/listar-imagenes-docker');
  }



  login(credentials: { Nombre_Usuario: string, Password_Usuario: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          // Si el inicio de sesión fue exitoso, almacena el token JWT en el almacenamiento local
          if (response && response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
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

  getUserInfo(Nombre_Usuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/userinfo`,{Nombre_Usuario});
  }
  
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      // Verificar si existe un token de acceso en localStorage
      return !!localStorage.getItem('accessToken');
    } else {
      // Si localStorage no está disponible, asumimos que el usuario no está logueado
      return false;
    }
  }
  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      // Eliminar el token de acceso de localStorage
      localStorage.removeItem('accessToken');
    }
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
