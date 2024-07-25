import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DockerService } from '../../../Services/docker.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-docker-logs',
  templateUrl: './docker-logs.component.html',
  styleUrl: './docker-logs.component.css'
})
export class DockerLogsComponent {
  Logs: FormGroup;
  logs: string = '';
  constructor(private formBuilder: FormBuilder,private DockerService:DockerService){
    this.Logs = this.formBuilder.group({
      containerName: ['', [Validators.required]]
    });
  }
  
  highlightInvalidFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.highlightInvalidFields(control);
      } else {
        control?.markAsTouched();
        control?.markAsDirty();
      }
    });
  }

  
  resetForm() {
    this.Logs.reset(); // Resetea todos los campos
  }

  LogsContainer(){
    if (this.Logs.valid) {
      this.DockerService.DockerLogs(this.Logs.value).subscribe(
        response => {
          this.logs = response.logs;
          console.log("Logs ", response);
          Swal.fire({
            icon: 'success',
            title: 'Logs cargados',
            text: 'Los logs se cargaron exitosamente.'
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
        },
        error => {
          console.error('Error al cargar los logs:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar los logs',
            text: 'Hubo un problema al cargar los logs de contenedor. porfavor intenta nuevamente, si el error persiste revisa la terminal'
          });
          
        }
      )
    }else {
      Object.keys(this.Logs.controls).forEach(field => {
        const control = this.Logs.get(field);
        if (control instanceof FormGroup) {
          this.highlightInvalidFields(control);
        } else {
          control?.markAsTouched();
        }
      });
      // Mostrar mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.'
      });
    }
  }
}
