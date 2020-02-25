import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [DashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TooltipModule.forRoot()
  ]
})
export class DashboardModule {
}
