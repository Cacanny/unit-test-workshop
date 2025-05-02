import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PublicDashboardModule } from './public-dashboard/public-dashboard.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PublicDashboardModule,
    AdminDashboardModule,
    DashboardRoutingModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
