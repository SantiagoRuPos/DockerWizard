import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceLoginService} from '../../../Services/service-login.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  users: any[] = [];
  Nombre_Usuario: string ='';

  constructor(private ServiceLoginService:ServiceLoginService){{

  }}
  loadUsers() {
    if (this.Nombre_Usuario.trim() !== '') {
      this.ServiceLoginService.GetUser(this.Nombre_Usuario).subscribe(
        (data: any[]) => {
          console.log("--------aqui-----------");
          this.users = Array.isArray(data) ? data : [];
        },
        error => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
    } else {
      this.ServiceLoginService.GetUser().subscribe(
        (data: any[]) => {
          console.log("--------aqui2-----------");
          this.users = Array.isArray(data) ? data : [];
        },
        error => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
    }
  }
}
