import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {ServiceLoginService} from '../../../Services/service-login.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrl: './reset-password-user.component.css'
})
export class ResetPasswordUserComponent {
  resetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private ServiceLoginService:ServiceLoginService) {
    this.resetPasswordForm = this.formBuilder.group({
      Password_Usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      Nombre_Usuario: ['',Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
   if (this.resetPasswordForm.valid) {
    this.ServiceLoginService.ResetPassword(this.resetPasswordForm.value).subscribe(
      response =>{
        console.log('Usuario registrado exitosamente:', response);
        Swal.fire({
          icon: 'success',
          title: 'Actulizacion Realizada',
          text: 'La contraseña se actualizo correctamente.'
        }).then(() => {
          // Realizar cualquier acción adicional después de registrar al usuario
         this.resetForm();
        });
      },
      error => {
        console.error('Error al actulizar la contraseña del usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de Actulización',
          text: 'Ocurrió un error al actualizar la contraseña del usuario. Por favor, inténtalo de nuevo. o comprueba que el usuario este correcto '
        });
      }
    )
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Formulario incompleto',
      text: 'Por favor, completa todos los campos correctamente.'
    });
   }
    console.log(this.resetPasswordForm.value);
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const Password_Usuario = control.get('Password_Usuario');
    const confirmPassword = control.get('confirmPassword');
    
    if (Password_Usuario && confirmPassword && Password_Usuario.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    
    return null;
  }
  resetForm() {
    this.resetPasswordForm.reset(); // Resetea todos los campos
  }
}
