import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';
import { ProgressRoutingModule } from './progress-routing.module';
import { InsuranceStatusDescriptionModule } from '../../shared/status/status.module';

@NgModule({
  declarations: [ProgressComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    InsuranceStatusDescriptionModule,
  ],
  exports: [ProgressComponent],
})
export class ProgressModule {}
