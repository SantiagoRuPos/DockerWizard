import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ServiceLoginService} from '../../../Services/service-login.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})


export class NewProjectComponent implements OnInit {
  projectForm: FormGroup;

  Rol_Proyecto = ['Proyecto de Investigación', 'Proyecto de grado'];//ya hay table se debe de llenar automatico con los datos de la bse de datos
  Cargo_Institucional = ['Profesor','Estudiante','Investigador']; ///Tabla existente
  Programa_Perteneciente = ['Ingeniería Electrónica','Ingeniería Sistemas','Ingeniería Industrial','Tecnologiá en Electronica Industrial', 'Tecnología en Sistemas de Información','Tecnología en Producción Industrial']; //tabla existente
  constructor(private formBuilder: FormBuilder) { 
     this.projectForm = this.formBuilder.group({
    nombreProyecto: ['', Validators.required],
    nombreAcronimo: ['', [Validators.required,  Validators.pattern('[a-zA-Z0-9]+'),Validators.minLength(4), Validators.maxLength(8)]],
    usuarioCygnus: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(4), Validators.maxLength(10)]],
    rolProyecto: ['', Validators.required],
    nombreLider: ['', Validators.required],
    numeroLider: ['', Validators.required],
    correoLider: ['', [Validators.required, Validators.email]],
    cargoInstitucional: ['', Validators.required],
    programaPerteneciente: ['', Validators.required],
    semillero: [''],
    grupoInvestigacion: ['']
  });}

  ngOnInit(): void {
  
  }

  submitForm() {
    if (this.projectForm.valid) {
      // Aquí puedes enviar el formulario al servicio del API
      console.log(this.projectForm.value); // Solo para propósitos de demostración
    } else {
      // Marcar campos inválidos
      Object.values(this.projectForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
