import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FacadeService } from '../store/facade.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  router = inject(Router);
  facade = inject(FacadeService);

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.facade.isLoggedIn$.pipe(
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
