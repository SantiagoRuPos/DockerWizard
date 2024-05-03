import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {ServiceLoginService} from '../../../Services/service-login.service';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registroForm: FormGroup;
  Tipo_Identificacion = ['Cédula de Ciudadanía', 'Tarjeta de Identidad', 'Pasaporte', 'Cédula Extranjera'];

  constructor(private formBuilder: FormBuilder, private ServiceLoginService: ServiceLoginService) {
    
    this.registroForm = this.formBuilder.group({
      Tipo_Identificacion_Usuario: ['', Validators.required],
      Numero_Identificacion_Usuario: ['', Validators.required],
      Nombre_Completo_Usuario: ['', Validators.required],
      Correo_Institucional_Usuario:['', [Validators.required, Validators.email]],
      Numero_Contacto: ['', Validators.required],
      Nombre_Usuario: ['', Validators.required],
      Password_Usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(4), Validators.maxLength(8)]],
      Confirmar_Password_Usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(4), Validators.maxLength(8)]],
      Nombre_Usuario_Cygnus: ['', Validators.required]
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
    if (this.registroForm.valid) {
      // Enviar datos al servicio para registrar al usuario
      this.ServiceLoginService.registerUser(this.registroForm.value).subscribe(
        response => {
          console.log('Usuario registrado exitosamente:', response);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El usuario se ha registrado correctamente.'
          }).then(() => {
            // Realizar cualquier acción adicional después de registrar al usuario
            this.resetForm();
          });
        },
        error => {
          console.error('Error al registrar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: 'Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo. o comprueba que el usuario ya no se encuentre registrado '
          });
        }
      );
    } else {
      // Resaltar campos inválidos en rojo
      Object.keys(this.registroForm.controls).forEach(field => {
        const control = this.registroForm.get(field);
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
    this.registroForm.reset(); // Resetea todos los campos
  }
  
}