import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicDashboardComponent } from './public-dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PublicDashboardComponent],
  imports: [CommonModule, RouterModule],
  exports: [PublicDashboardComponent],
})
export class PublicDashboardModule {}
