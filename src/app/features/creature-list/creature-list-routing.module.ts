import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatureListComponent } from './creature-list.component';
import { CreatureComponent } from './creature/creature.component';

const routes: Routes = [
  {
    path: '',
    component: CreatureListComponent,
  },
  {
    path: ':id',
    component: CreatureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatureListRoutingModule {}
