import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioInfoService} from '../../Services/usuario-info.service';
@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrl: './body-home.component.css'
})
export class BodyHomeComponent implements OnInit{
  usuarios: any[] = [];
  showTooltip: boolean = false; 
  constructor (private  UsuarioInfoService:UsuarioInfoService,private router:Router){

  }
  ngOnInit(): void {
    this.usuarios=this.UsuarioInfoService.getUsuarios();
    console.log(this.usuarios);
    
  }

  RutaRapidaNuevoUsuarioCygnus(){
    this.router.navigate(['/NewUserCygnus']); 

  }
  RutaRapidaNuevoProyectoDockerWizard(){
    this.router.navigate(['/Registro-nuevo-proyecto']); 

  }
  RutaRapidaReporteFallo(){
    this.router.navigate(['/Reports']); 

  }
  RutaRapidaPerfil(){
    this.router.navigate(['/']); 

  }


  }

