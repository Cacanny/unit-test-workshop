import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceStatusDescriptionPipe } from './status.pipe';
import { StatusBadgeDirective } from './status.directive';

@NgModule({
  declarations: [InsuranceStatusDescriptionPipe, StatusBadgeDirective],
  imports: [CommonModule],
  exports: [InsuranceStatusDescriptionPipe, StatusBadgeDirective],
})
export class InsuranceStatusDescriptionModule {}
