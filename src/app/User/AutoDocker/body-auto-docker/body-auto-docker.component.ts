import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-body-auto-docker',
  templateUrl: './body-auto-docker.component.html',
  styleUrl: './body-auto-docker.component.css'
})
export class BodyAutoDockerComponent {
  constructor(private router: Router){

  }
  StatusServicesDocker(){
    this.router.navigate(['/StatusServicesDocker']);
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

}