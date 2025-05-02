import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { CreatureListResolverService } from './creature-list/creature-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'creatures',
        resolve: { creatures: CreatureListResolverService },
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./creature-list/creature-list.module').then(
            (m) => m.CreatureListModule,
          ),
      },
      {
        path: 'claims',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./claims/claims.module').then((m) => m.ClaimsModule),
      },
      {
        path: 'progress',
        canActivate: [AuthorizationGuard],
        loadChildren: () =>
          import('./progress/progress.module').then((m) => m.ProgressModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
