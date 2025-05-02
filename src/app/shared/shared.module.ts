import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from './spinner/spinner.module';
import { InsuranceStatusDescriptionModule } from './status/status.module';

@NgModule({
  imports: [CommonModule],
  exports: [InsuranceStatusDescriptionModule, SpinnerModule],
})
export class SharedModule {}
