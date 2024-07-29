import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DockerService } from '../../../Services/docker.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-ruta',
  templateUrl: './new-ruta.component.html',
  styleUrl: './new-ruta.component.css'
})
export class NewRutaComponent {
  data: FormGroup;
  logs: string = '';
  constructor(private formBuilder: FormBuilder,private DockerService:DockerService){
    this.data = this.formBuilder.group({
      NmaeRuta: ['', [Validators.required]],
      dockerName: ['', [Validators.required]]
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
    this.data.reset(); // Resetea todos los campos
  }

  Ruta(){
    if (this.data.valid) {
      this.DockerService.NewRuta(this.data.value).subscribe(
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
      Object.keys(this.data.controls).forEach(field => {
        const control = this.data.get(field);
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
