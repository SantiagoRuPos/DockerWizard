import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CygnusService } from '../../../Services/cygnus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user-cygnus',
  templateUrl: './new-user-cygnus.component.html',
  styleUrl: './new-user-cygnus.component.css'
})
export class NewUserCygnusComponent {
  UserCygnusForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private CygnusService:CygnusService){
    this.UserCygnusForm = this.formBuilder.group({
      Nombre_Usuario_Cygnus: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
      Password_Usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(4)]],
      Confirmar_Password_Usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(4)]]
    }, { validators: this.checkPasswords });
  }
 
  checkPasswords(group: FormGroup | null) {
    if (!group) return null; // Comprobación para evitar errores si el grupo es nulo
    const pass = group.get('Password_Usuario')?.value;
    const confirmPass = group.get('Confirmar_Password_Usuario')?.value;

    if (pass !== confirmPass) {
      group.get('Confirmar_Password_Usuario')?.setErrors({ notSame: true });

    
    } else {
      group.get('Confirmar_Password_Usuario')?.setErrors(null);
    }

    return pass === confirmPass ? null : { notSame: true };
  }

  submitForm() {
    if (this.UserCygnusForm.valid) {
      this.CygnusService.NewUserCygnus(this.UserCygnusForm.value).subscribe(
        response => {
          console.log('Usuario registrado exitosamente:', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El usuario se ha registrado correctamente.'
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
            Toast.fire({
              icon: "success",
              title:"Recuerda: Asignar los permisos necesarios al usuario deser necesario"
            });
            this.resetForm();
          });
        },
        error => {
          console.error('Error al registrar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo o verifica que el usuario no esté ya registrado. Si el error persiste, revisa el terminal o reporta el fallo.'
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
    this.UserCygnusForm.reset(); // Resetea todos los campos
  }
}
