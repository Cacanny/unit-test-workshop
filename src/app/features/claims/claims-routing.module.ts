import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsComponent } from './claims.component';
import { ClaimsDetailComponent } from './claims-detail/claims-detail.component';
import { ClaimsDetailResolverService } from './claims-detail/claims-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ClaimsComponent,
  },
  {
    path: ':id',
    resolve: {
      insuranceClaim: ClaimsDetailResolverService,
    },
    component: ClaimsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsRoutingModule {}
