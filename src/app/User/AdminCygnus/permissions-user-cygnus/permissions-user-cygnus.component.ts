import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CygnusService } from '../../../Services/cygnus.service';
import Swal from 'sweetalert2';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-permissions-user-cygnus',
  templateUrl: './permissions-user-cygnus.component.html',
  styleUrl: './permissions-user-cygnus.component.css'
})

export class PermissionsUserCygnusComponent {
  UserCygnusForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private CygnusService:CygnusService){
    this.UserCygnusForm = this.formBuilder.group({
      Nombre_Usuario_Cygnus: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
      Grupo_Cygnus: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]]
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
  
  ReserPassword(){
    if (this.UserCygnusForm.valid) {
      console.log("Ok");
    } else {
      console.log("No Ok");
    }
  }

  resetForm() {
    this.UserCygnusForm.reset(); // Resetea todos los campos
  }

  AsignarGrupo(){
    if (this.UserCygnusForm.valid) {
      this.CygnusService.AsignarPermiso(this.UserCygnusForm.value).subscribe(
        response => {
          console.log("Permiso Asignado", response);
          Swal.fire({
            icon: 'success',
            title: 'Permiso Asignado exitosamente',
            text: 'El Permiso se ha Asignado correctamente.'
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
          console.error('Error al asignar el permiso al usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al Asignar',
            text: 'Hubo un problema al Asignar el permiso al usuario. Por favor, inténtalo de nuevo o verifica que el nombre del permiso se encuentre correctamente. Si el error persiste, revisa el terminal o reporta el fallo.'
          });
          
        }
      )
    }else {
      Object.keys(this.UserCygnusForm.controls).forEach(field => {
        const control = this.UserCygnusForm.get(field);
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

  QuitarGrupo() {
    // Muestra la alerta de confirmación antes de continuar
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Realmente deseas quitar el permiso?',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar permiso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Verifica si el formulario es válido
        if (this.UserCygnusForm.valid) {
          // Envía la solicitud para quitar el permiso
          this.CygnusService.QuitarPermiso(this.UserCygnusForm.value).subscribe(
            response => {
              console.log("Permiso Quitado", response);
              // Muestra la alerta de éxito
              Swal.fire({
                icon: 'success',
                title: 'Permiso quitado exitosamente',
                text: 'El permiso se ha quitado correctamente.'
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
              console.error('Error al quitar el permiso al usuario:', error);
              // Muestra la alerta de error
              Swal.fire({
                icon: 'error',
                title: 'Error al quitar permiso',
                text: 'Hubo un problema al quitar el permiso al usuario. Por favor, inténtalo de nuevo o verifica que el nombre del permiso sea correcto. Si el error persiste, revisa el terminal o reporta el fallo.'
              });
            }
          );
        } else {
          // Marca los campos del formulario como tocados para mostrar los mensajes de error
          Object.keys(this.UserCygnusForm.controls).forEach(field => {
            const control = this.UserCygnusForm.get(field);
            if (control instanceof FormGroup) {
              this.highlightInvalidFields(control);
            } else {
              control?.markAsTouched();
            }
          });
          // Muestra un mensaje de error indicando que el formulario está incompleto
          Swal.fire({
            icon: 'error',
            title: 'Formulario incompleto',
            text: 'Por favor, completa todos los campos correctamente.'
          });
        }
      }
    });
  }
}

