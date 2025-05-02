import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SpinnerModule } from '../../../shared/spinner/spinner.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  imports: [CommonModule, SpinnerModule, RouterModule],
})
export class AdminDashboardModule {}
