import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ClaimsDetailComponent } from './claims-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../../../shared/spinner/spinner.module';

@NgModule({
  declarations: [ClaimsDetailComponent],
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  exports: [ClaimsDetailComponent],
})
export class ClaimsDetailModule {}
