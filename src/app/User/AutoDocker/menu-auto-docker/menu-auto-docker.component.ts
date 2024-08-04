import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-auto-docker',
  templateUrl: './menu-auto-docker.component.html',
  styleUrl: './menu-auto-docker.component.css'
})
export class MenuAutoDockerComponent {
  constructor(private router: Router){

  }
  StatusServicesDocker(){
    this.router.navigate(['/StatusServicesDocker']);
  }
  Atras(){
    this.router.navigate(['/AutoDocker']);
  }
  BackUpDocker(){
    this.router.navigate(['/BackUpDocker']);
  }
  DockerUp(){
    this.router.navigate(['/DockerUp']);
  }
  DockerLogs(){
    this.router.navigate(['/DockerLogs']);
  }
  MonitoringImages(){
    this.router.navigate(['/MonitoringImages']);
    }
    NewRoute(){
      this.router.navigate(['/NewRoute']);
    }
    NewDocker(){
      this.router.navigate(['NewDocker']);
    }
}
