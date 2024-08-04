import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  TipoServicio = ['Web','Base de datos','Web y base de datos']; 
  image = ['nginx','mysql:5.6','phpmyadmin/phpmyadmin','php:7.4-apache']; 
  imageOptions = ['nginx','mysql:5.6','phpmyadmin/phpmyadmin','php:7.4-apache']; 
  Phpmyadmin = ['nginx','mysql:5.6','phpmyadmin/phpmyadmin','php:7.4-apache']; 

  constructor(private fb: FormBuilder,private DockerService:DockerService) {
 
    this.dockerWebForm = this.fb.group({
      NombreContenedor: ['',[Validators.required]],
      image: [[Validators.required]],  // valor por defecto
      volumenes: ['',[Validators.required]],
      dockerName: ['',[Validators.required]]
    });

    this.dockerMysqlPhpmyadminForm = this.fb.group({
      NombreContenedor: ['',[Validators.required]],
      image: [[Validators.required]],  // valor por defecto
      MYSQL_DATABASE: ['',[Validators.required]],
      MYSQL_USER: ['',[Validators.required]],
      MYSQL_PASSWORD: ['',[Validators.required]],
      MYSQL_ROOT_PASSWORD: ['',[Validators.required]],
      volumenes: ['',[Validators.required]],
      dockerName: ['',[Validators.required]],
      NombreContenedorPHPmyadmin: ['',[Validators.required]],
      imagePHPmyadmin: [[Validators.required]],   // valor por defecto
      dockerNamephpmyadmin: ['',[Validators.required]],
      PMA_HOST: ['', [Validators.required, this.matchAlias.bind(this)]],
      depends_on: ['', [Validators.required, this.matchContenedor.bind(this)]]
    });

    this.dockerWebMysqlForm = this.fb.group({
      NombreContenedorWEB: ['',[Validators.required]],
      image: [[Validators.required]],  // valor por defecto
      volumenesWEB: ['',[Validators.required]],
      dockerNameWEB: ['',[Validators.required]],
      linksWEB: ['',[Validators.required]],
      NombreContenedorMYSQL: ['',[Validators.required]],
      imageMYSQL: [[Validators.required]],  // valor por defecto
      MYSQL_DATABASE: ['',[Validators.required]],
      MYSQL_USER: ['',[Validators.required]],
      MYSQL_PASSWORD: ['',[Validators.required]],
      MYSQL_ROOT_PASSWORD: ['',[Validators.required]],
      volumenesMYSQL: ['',[Validators.required]],
      dockerNameMYSQL: ['',[Validators.required]],
      NombreContenedorPHPmyadmin: ['',[Validators.required]],
      imagePHPmyadmin: [[Validators.required]],  // valor por defecto
      dockerNamephpmyadmin: ['',[Validators.required]],
      PMA_HOST:  ['',[Validators.required]],
      depends_on:  ['',[Validators.required]]
    });

  }
  

  matchAlias(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent as FormGroup;
    if (formGroup) {
      const nombreContenedor = formGroup.get('NombreContenedor')?.value;
      const pmaHost = control.value;
      if (nombreContenedor !== pmaHost) {
        return { matchAlias: true };
      }
    }
    return null;
  }
  matchContenedor(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent as FormGroup;
    if (formGroup) {
      const nombreContenedor = formGroup.get('NombreContenedor')?.value;
      const dependsOn = control.value;
      if (nombreContenedor !== dependsOn) {
        return { matchContenedor: true };
      }
    }
    return null;
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


  onSubmitDockerMysqlPhpmyadmin(): void {
    console.log(this.dockerMysqlPhpmyadminForm.value);
    if (this.dockerMysqlPhpmyadminForm.invalid) {
      const pmaHostErrors = this.dockerMysqlPhpmyadminForm.get('PMA_HOST')?.errors;
      const dependsOnErrors = this.dockerMysqlPhpmyadminForm.get('depends_on')?.errors;

      if (pmaHostErrors?.['matchAlias']) {
        Swal.fire({
          icon: 'error',
          title: 'Error de Validación',
          text: 'PMA_HOST debe ser igual al alias del contenedor de MySQL.'
        });
      }

      if (dependsOnErrors?.['matchContenedor']) {
        Swal.fire({
          icon: 'error',
          title: 'Error de Validación',
          text: 'depends_on debe ser igual al nombre del contenedor de MySQL.'
        });
      }
    }    else if(this.dockerMysqlPhpmyadminForm.valid) {
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
}