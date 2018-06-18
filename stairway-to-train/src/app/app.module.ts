import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './shared/http-interceptors';

import { AppRoutingModule } from './app-routing.module';

import { CommonDeutschebahnRequestService } from './shared/service/common-deutschebahn-request.service';
import { FaStaService } from './shared/service/fa-sta.service';
import { StaDaService } from './shared/service/sta-da.service';
import { AuthService } from './shared/service/auth.service';
import { WayService } from './shared/service/way.service';
import { WaysOverviewComponent } from './ways-overview/ways-overview.component';
import { WayDetailsComponent } from './way-details/way-details.component';
import { HomeComponent } from './home/home.component';
import { WayDetailsEditComponent } from './way-details-edit/way-details-edit.component';
import { StationSearchComponent } from './station-search/station-search.component';
import { StationComponent } from './station/station.component';


@NgModule({
  declarations: [
    AppComponent,
    WaysOverviewComponent,
    WayDetailsComponent,
    HomeComponent,
    WayDetailsEditComponent,
    StationSearchComponent,
    StationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CommonDeutschebahnRequestService,
    FaStaService,
    StaDaService,
    AuthService,
    httpInterceptorProviders,
    WayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
