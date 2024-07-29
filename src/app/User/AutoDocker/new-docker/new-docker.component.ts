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
    { label: 'httpd', value: 'httpd' },
    { label: 'mysql:5.7', value: 'mysql:5.7' },
    { label: 'phpmyadmin/phpmyadmin', value: 'phpmyadmin/phpmyadmin' }
  ];

  constructor(private fb: FormBuilder,private DockerService:DockerService) {
 
    this.dockerWebForm = this.fb.group({
      NombreContenedor: ['',[Validators.required]],
      image: [this.imageOptions[0].value,[Validators.required]],  // valor por defecto
      volumenes: ['',[Validators.required]],
      dockerName: ['',[Validators.required]]
    });

    this.dockerMysqlPhpmyadminForm = this.fb.group({
      nombreContenedor: [''],
      image: [this.imageOptions[2].value],  // valor por defecto
      MYSQL_DATABASE: [''],
      MYSQL_USER: [''],
      MYSQL_PASSWORD: [''],
      MYSQL_ROOT_PASSWORD: [''],
      volumenes: [''],
      dockerName: [''],
      nombreContenedorPHPmyadmin: [''],
      imagePHPmyadmin: [this.imageOptions[3].value],  // valor por defecto
      dockerNamephpmyadmin: [''],
      PMA_HOST: [''],
      depends_on: ['']
    });

    this.dockerWebMysqlForm = this.fb.group({
      nombreContenedorWEB: [''],
      imageWEB: [this.imageOptions[0].value],  // valor por defecto
      volumenesWEB: [''],
      dockerNameWEB: [''],
      linksWEB: [''],
      nombreContenedorMYSQL: [''],
      imageMYSQL: [this.imageOptions[2].value],  // valor por defecto
      MYSQL_DATABASE: [''],
      MYSQL_USER: [''],
      MYSQL_PASSWORD: [''],
      MYSQL_ROOT_PASSWORD: [''],
      volumenesMYSQL: [''],
      dockerNameMYSQL: [''],
      nombreContenedorPHPmyadmin: [''],
      imagePHPmyadmin: [this.imageOptions[3].value],  // valor por defecto
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
        this.resetForm();
        });
      }
    )
   }
  }

  onSubmitDockerMysqlPhpmyadmin(): void {
    console.log(this.dockerMysqlPhpmyadminForm.value);
    // Lógica de manejo de datos
  }

  onSubmitDockerWebMysql(): void {
    console.log(this.dockerWebMysqlForm.value);
    // Lógica de manejo de datos
  }

  resetForm() {
    this.dockerWebForm.reset(); // Resetea todos los campos
  }

}