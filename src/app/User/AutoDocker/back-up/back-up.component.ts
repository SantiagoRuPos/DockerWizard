import { Component } from '@angular/core';
import { DockerService } from "../../../Services/docker.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-back-up',
  templateUrl: './back-up.component.html',
  styleUrl: './back-up.component.css'
})
export class BackUpComponent {
constructor(private DockerService:DockerService){
  
}
BackUp(){
  this.DockerService.BackUp().subscribe(
    response => {
      console.log('Copia de seguridad realizada con éxito', response);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "¡Backup Realizado!",
        text: "La copia de seguridad se ha completado con éxito.",  
      });
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Error de al consultar',
        text: "No se pudo crear el backup. Inténtalo nuevamente. Si el error persiste, revisa la consola."
      });
      console.error('Error al realizar la copia de seguridad', error);
   
    }
  )
}
}
