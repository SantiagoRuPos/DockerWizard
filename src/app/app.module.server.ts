import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {ServiceLoginService} from '../app/Services/service-login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule,
    ToastrModule,

  ],
  providers: [ServiceLoginService],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
