import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../store/facade.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  facade = inject(FacadeService);
  router = inject(Router);

  loggedInUser$ = this.facade.loggedInUser$;

  logOut(): void {
    this.facade.logOut();
    this.router.navigate(['/logout']);
  }
}
