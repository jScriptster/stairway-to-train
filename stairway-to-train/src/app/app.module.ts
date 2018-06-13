import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './shared/http-interceptors';

import { AppRoutingModule } from './app-routing.module';

import { CommonDeutschebahnRequestService } from './shared/service/common-deutschebahn-request.service';
import { FaStaService } from './shared/service/fa-sta.service';
import { StaDaService } from './shared/service/sta-da.service';
import { AuthService } from './shared/service/auth.service';
import { WaysOverviewComponent } from './ways-overview/ways-overview.component';
import { WayDetailsComponent } from './way-details/way-details.component';


@NgModule({
  declarations: [
    AppComponent,
    WaysOverviewComponent,
    WayDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
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
