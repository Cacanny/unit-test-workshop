import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';
import { ClaimsDetailModule } from './claims-detail/claims-detail.module';
import { ClaimsRoutingModule } from './claims-routing.module';
import { InsuranceStatusDescriptionModule } from '../../shared/status/status.module';
import { SubmitClaimModule } from './submit-claim/submit-claim.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClaimsComponent],
  imports: [
    CommonModule,
    ClaimsDetailModule,
    ClaimsRoutingModule,
    SubmitClaimModule,
    RouterModule,
    InsuranceStatusDescriptionModule,
  ],
  exports: [ClaimsComponent],
})
export class ClaimsModule {}
