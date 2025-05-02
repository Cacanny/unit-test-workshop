import { NgModule } from '@angular/core';
import { CreatureComponent } from './creature.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FraudRiskBadgeDirective } from './fraud-risk-badge.directive';
import { InsuranceStatusDescriptionModule } from '../../../shared/status/status.module';

@NgModule({
  declarations: [CreatureComponent, FraudRiskBadgeDirective],
  imports: [CommonModule, RouterModule, InsuranceStatusDescriptionModule],
  exports: [CreatureComponent],
})
export class CreatureModule {}
