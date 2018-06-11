import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './shared/http-interceptors';

import { CommonDeutschebahnRequestService } from './shared/service/common-deutschebahn-request.service';
import { FaStaService } from './shared/service/fa-sta.service';
import { StaDaService } from './shared/service/sta-da.service';
import { AuthService } from './shared/service/auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CommonDeutschebahnRequestService,
    FaStaService,
    StaDaService,
    AuthService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
