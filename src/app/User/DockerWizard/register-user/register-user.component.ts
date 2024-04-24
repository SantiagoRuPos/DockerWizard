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
export class RegisterUserComponent{
  registroForm: FormGroup;
  Tipo_Identificacion = ['Cédula de Ciudadanía', 'Tarjeta de Identidad', 'Pasaporte', 'Cédula Extranjera'];
  error = '';
  constructor(private formBuilder: FormBuilder,private ServiceLoginService: ServiceLoginService) { 
    this.registroForm = this.formBuilder.group({
      Tipo_Identificacion_Usuario: ['',[Validators.required]],
      Numero_Identificacion_Usuario: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      Nombre_Completo_Usuario: ['', Validators.required],
      Correo_Institucional_Usuario: ['', [Validators.required, Validators.email]],
      Numero_Contacto: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      Nombre_Usuario: ['', Validators.required],
      Password_Usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      Confirmar_Password_Usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      Nombre_Usuario_Cygnus: ['', Validators.required]
    });
  }


  

  submitForm() {
    console.log("todo fine");
    if (this.registroForm.valid) {
      // Aquí puedes enviar los datos del formulario al servidor
      console.log(this.registroForm.value);
      alert('Formulario enviado correctamente');
    } else {
      
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        icon: 'error',
        title: 'Error de registro',
        text: 'Al parecer hubo un error al realizar el registro intenta nuevamente.',
      });
    }
  }
}
