import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioInfoService {
  private usuariosKey = 'usuarios';
  private idUsuarioKey = 'idUsuario';


  constructor() { }

  setUsuarios(usuarios: any[]) {
    localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
  }

  getUsuarios(): any[] {
    const usuariosString = localStorage.getItem(this.usuariosKey);
    return usuariosString ? JSON.parse(usuariosString) : [];
  }

  setIdUsuario(id: number) {
    localStorage.setItem(this.idUsuarioKey, id.toString());
  }

  getIdUsuario(): number | undefined {
    const idString = localStorage.getItem(this.idUsuarioKey);
    return idString ? parseInt(idString, 10) : undefined;
  }
}
