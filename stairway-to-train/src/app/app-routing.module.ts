import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaysOverviewComponent } from './ways-overview/ways-overview.component';
import { WayDetailsComponent } from './way-details/way-details.component';

const routes:Routes = [
  {path: '', component: WaysOverviewComponent},
  {path: 'details/:id', component: WayDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
