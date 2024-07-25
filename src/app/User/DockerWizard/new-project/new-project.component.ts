import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ServiceLoginService} from '../../../Services/service-login.service';
import {UsuarioInfoService} from '../../../Services/usuario-info.service';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'] // Aquí corregido
})

export class NewProjectComponent implements OnInit {

  projectForm: FormGroup;
  usuarios: any[] = [];
  Usuario_Registrador_Proyecto: any; 
  Rol_Proyecto = ['Proyecto de Investigación', 'Proyecto de grado'];//ya hay table se debe de llenar automatico con los datos de la bse de datos
  Cargo_Institucional_Lider = ['Profesor','Estudiante','Investigador']; ///Tabla existente
  Programa_Academico_Proyecto = ['Ingeniería Electrónica','Ingeniería Industrial','Ingeniería Sistemas','Tecnologiá en Electronica Industrial', 'Tecnología en Sistemas de Información','Tecnología en Producción Industrial']; //tabla existente
  constructor(private formBuilder: FormBuilder, private UsuarioInfoService:UsuarioInfoService, private ServiceLoginService: ServiceLoginService) { 
    
     this.projectForm = this.formBuilder.group({
    Nombre_Proyecto: ['', Validators.required],
    Nombre_Proyecto_Acronimo: ['', [Validators.required,  Validators.pattern('[a-zA-Z0-9]+'),Validators.minLength(4), Validators.maxLength(20)]],
    Nombre_Usuario_Cygnus: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(4)]],
    Rol_Proyecto: ['', Validators.required],
    Nombre_Lider_Proyecto: ['', Validators.required],
    Telefono_Lider_Proyecto: ['', Validators.required],
    Correo_Institucional_Lider: ['', [Validators.required, Validators.email]],
    Cargo_Institucional_Lider: ['', Validators.required],
    Programa_Academico_Proyecto: ['', Validators.required],
    Semillero_Lider: [''],
    Grupo_Investigacion: [''],
    Usuario_Registrador_Proyecto: ['']
  
  });
  const Usuario_Registrador_Proyecto = this.UsuarioInfoService.getIdUsuario();
  this.projectForm.get('Usuario_Registrador_Proyecto')?.setValue(Usuario_Registrador_Proyecto);

}

  ngOnInit(): void {
    this.usuarios = this.UsuarioInfoService.getUsuarios();
    if (this.usuarios.length > 0) {
      // Si hay usuarios, obtenemos el IdUsuario del primer usuario
      this.Usuario_Registrador_Proyecto = this.usuarios[0].Id_Usuario;
      //console.log("ID de Usuario:", this.idUsuario); // Imprimir el ID de usuario por consola
      // Guardamos el IdUsuario en el servicio
      this.UsuarioInfoService.setIdUsuario(this.Usuario_Registrador_Proyecto);
    } else {
      // Si no hay usuarios, establecemos idUsuario en null
      this.Usuario_Registrador_Proyecto = null;
      console.log("No hay usuarios almacenados"); // Aviso de que no hay usuarios almacenados
    }
  }

  submitForm() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
    this.ServiceLoginService.RegisterNewProject(this.projectForm.value).subscribe(
      response => {
        console.log('registrado exitosamente:', response);
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
      // Marcar campos inválidos
      Object.values(this.projectForm.controls).forEach(control => {
        control.markAsTouched();
      });
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.'
      });
    }
  }

  resetForm() {
    this.projectForm.reset(); // Resetea todos los campos
  }

}
