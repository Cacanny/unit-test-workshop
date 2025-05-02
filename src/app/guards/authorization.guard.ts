import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { insuraQuestFeature } from '../store/feature/insura-quest.feature';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  router = inject(Router);
  store = inject(Store);

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(insuraQuestFeature.selectIsLoggedIn).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }

        const returnUrl = window.location.pathname;

        this.router.navigate(['/login'], { queryParams: { returnUrl } });
        return false;
      }),
    );
  }
}
