import { Component } from '@angular/core';

import {ServiceLoginService} from '../../Services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  imagenes: string = '';
  constructor (private ServiceLoginService:ServiceLoginService){
  }
  ngOnInit(): void {
    //this.listarImagenesDocker();
  }

/*  listarImagenesDocker() {
    this.ServiceLoginService.listarImagenesDocker().subscribe(
      (data: any) => {
        this.imagenes = data.images;
      },
      (error: any) => {
        console.error('Error al obtener las imágenes de Docker:', error);
      }
    );
  }*/
}
