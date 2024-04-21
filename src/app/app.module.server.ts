import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {ServiceLoginService} from '../app/Services/service-login.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule

  ],
  providers: [ServiceLoginService],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
