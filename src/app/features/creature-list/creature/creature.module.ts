import { NgModule } from '@angular/core';
import { CreatureComponent } from './creature.component';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FraudRiskBadgeDirective } from './fraud-risk-badge.directive';

@NgModule({
  declarations: [CreatureComponent, FraudRiskBadgeDirective],
  imports: [CommonModule, RouterModule, CurrencyPipe],
  exports: [CreatureComponent],
})
export class CreatureModule {}
