import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';
import { ClaimsDetailModule } from './claims-detail/claims-detail.module';
import { ClaimsRoutingModule } from './claims-routing.module';

@NgModule({
  declarations: [ClaimsComponent],
  imports: [CommonModule, ClaimsDetailModule, ClaimsRoutingModule],
  exports: [ClaimsComponent],
})
export class ClaimsModule {}
