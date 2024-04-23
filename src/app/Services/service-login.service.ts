import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

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


  /*login(Nombre_Usuario: string, Password_Usuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { Nombre_Usuario, Password_Usuario });
  }*/

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
}
