import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitClaimComponent } from './submit-claim.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../../../shared/spinner/spinner.module';

@NgModule({
  declarations: [SubmitClaimComponent],
  imports: [CommonModule, ReactiveFormsModule, SpinnerModule],
  exports: [SubmitClaimComponent],
})
export class SubmitClaimModule {}
