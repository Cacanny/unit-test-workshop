import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatureListComponent } from './creature-list.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { CreatureListRoutingModule } from './creature-list-routing.module';
import { CreatureModule } from './creature/creature.module';

@NgModule({
  declarations: [CreatureListComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    CreatureListRoutingModule,
    CreatureModule,
  ],
  exports: [CreatureListComponent],
})
export class CreatureListModule {}
