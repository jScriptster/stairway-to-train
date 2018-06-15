import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { WaysOverviewComponent } from './ways-overview/ways-overview.component';
import { WayDetailsComponent } from './way-details/way-details.component';
import { WayDetailsEditComponent } from './way-details-edit/way-details-edit.component';

const routes:Routes = [
  {path: '', component: HomeComponent},
  {path: 'meine-routen', component: WaysOverviewComponent},
  {path: 'meine-routen/details/:id', component: WayDetailsComponent},
  {path: 'meine-routen/details/:id/bearbeiten', component: WayDetailsEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
