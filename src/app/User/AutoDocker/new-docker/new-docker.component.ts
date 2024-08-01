import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DockerService } from '../../../Services/docker.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-docker',
  templateUrl: './new-docker.component.html',
  styleUrl: './new-docker.component.css'
})
export class NewDockerComponent {
  panelOpenState: number = -1;

  dockerWebForm: FormGroup;
  dockerMysqlPhpmyadminForm: FormGroup;
  dockerWebMysqlForm: FormGroup;

  imageOptions = [
    { label: 'nginx', value: 'nginx' },
       { label: 'mysql:5.6e', value: 'mysql:5.7' },
    { label: 'phpmyadmin/phpmyadmin', value: 'phpmyadmin/phpmyadmin' },
    { label: 'php', value: 'php:7.4-apache' }
  ];
  Phpmyadmin = [
    { label: 'nginx', value: 'nginx' },
       { label: 'mysql:5.6e', value: 'mysql:5.7' },
    { label: 'phpmyadmin/phpmyadmin', value: 'phpmyadmin/phpmyadmin' },
    { label: 'php', value: 'php:7.4-apache' }
  ];

  constructor(private fb: FormBuilder,private DockerService:DockerService) {
 
    this.dockerWebForm = this.fb.group({
      NombreContenedor: ['',[Validators.required]],
      image: [this.imageOptions[0].value,[Validators.required]],  // valor por defecto
      volumenes: ['',[Validators.required]],
      dockerName: ['',[Validators.required]]
    });

    this.dockerMysqlPhpmyadminForm = this.fb.group({
      NombreContenedor: ['',[Validators.required]],
      image: [this.imageOptions[2].value,[Validators.required]],  // valor por defecto
      MYSQL_DATABASE: ['',[Validators.required]],
      MYSQL_USER: ['',[Validators.required]],
      MYSQL_PASSWORD: ['',[Validators.required]],
      MYSQL_ROOT_PASSWORD: ['',[Validators.required]],
      volumenes: ['',[Validators.required]],
      dockerName: ['',[Validators.required]],
      NombreContenedorPHPmyadmin: ['',[Validators.required]],
      imagePHPmyadmin: [this.Phpmyadmin[3].value,[Validators.required]],  // valor por defecto
      dockerNamephpmyadmin: ['',[Validators.required]],
      PMA_HOST: ['',[Validators.required]],
      depends_on: ['',[Validators.required]]
    });

    this.dockerWebMysqlForm = this.fb.group({
      NombreContenedorWEB: [''],
      imageWEB: [this.imageOptions[0].value],  // valor por defecto
      volumenesWEB: [''],
      dockerNameWEB: [''],
      linksWEB: [''],
      NombreContenedorMYSQL: [''],
      imageMYSQL: [this.imageOptions[2].value],  // valor por defecto
      MYSQL_DATABASE: [''],
      MYSQL_USER: [''],
      MYSQL_PASSWORD: [''],
      MYSQL_ROOT_PASSWORD: [''],
      volumenesMYSQL: [''],
      dockerNameMYSQL: [''],
      NombreContenedorPHPmyadmin: [''],
      imagePHPmyadmin: [this.Phpmyadmin[3].value],  // valor por defecto
      dockerNamephpmyadmin: [''],
      PMA_HOST: [''],
      depends_on: ['']
    });
  }

  setPanelState(index: number): void {
    this.panelOpenState = index;
  }

  onSubmitDockerWeb(): void {
    console.log(this.dockerWebForm.value);
   if (this.dockerWebForm.valid) {
    this.DockerService.DockerWeb(this.dockerWebForm.value).subscribe(
      response => {
        this.dockerWebForm = response.dockerWebForm;
        console.log("Docker web : ",response);
        Swal.fire({
          icon: 'success',
          title: 'Docker Generado',
          text: 'Se ha generado el nuevo docker exitosamente.'
        }).then(() => {
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
          this.Mensaje();
        this.resetForm1();
        
        });
      }
    )
   }
  }
  Mensaje(){
    Swal.fire({
      icon: 'info',
      title: 'Ejecuta Docker nuevamente',
      text: 'Recuerda reiniciar el servicio de Docker para desplegar los nuevos servicios. Asegúrate de realizar una copia de seguridad.'
    }).then(() => {
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
    });
  }

  onSubmitDockerMysqlPhpmyadmin(): void {
    console.log(this.dockerMysqlPhpmyadminForm.value);
    if (this.dockerMysqlPhpmyadminForm.valid) {
     this.DockerService.DockerMysql(this.dockerMysqlPhpmyadminForm.value).subscribe(
       response => {
         this.dockerWebForm = response.dockerWebForm;
         console.log("Docker web : ",response);
         Swal.fire({
           icon: 'success',
           title: 'Docker Generado',
           text: 'Se ha generado el nuevo docker exitosamente.'
         }).then(() => {
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
           this.Mensaje();
         this.resetForm2();
         
         });
       }
     )
    }

  }

  onSubmitDockerWebMysql(): void {
    console.log(this.dockerWebMysqlForm.value);
    if (this.dockerWebMysqlForm.valid) {
     this.DockerService.DockerWebMysql(this.dockerWebMysqlForm.value).subscribe(
       response => {
         this.dockerWebForm = response.dockerWebForm;
         console.log("Docker web : ",response);
         Swal.fire({
           icon: 'success',
           title: 'Docker Generado',
           text: 'Se ha generado el nuevo docker exitosamente.'
         }).then(() => {
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
           this.Mensaje();
         this.resetForm3();
         
         });
       }
     )
    }
    // Lógica de manejo de datos
  }

  resetForm1() {
    this.dockerWebForm.reset(); // Resetea todos los campos

  }
  resetForm2() {
 // Resetea todos los campos
 
    this.dockerMysqlPhpmyadminForm.reset();
  }
  resetForm3() {
 // Resetea todos los campos
    this.dockerWebMysqlForm.reset();
  
  }
}