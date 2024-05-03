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
  constructor (private  UsuarioInfoService:UsuarioInfoService){

  }
  ngOnInit(): void {
    this.usuarios=this.UsuarioInfoService.getUsuarios();
    console.log(this.usuarios);
  }



  }

