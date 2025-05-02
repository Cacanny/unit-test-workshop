import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../store/feature/insura-quest.feature';
import { InsuraQuestActions } from '../store/actions/insura-quest.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  store = inject(Store);
  router = inject(Router);

  loggedInUser$ = this.store.select(insuraQuestFeature.selectLoggedInUser);

  logOut(): void {
    this.store.dispatch(InsuraQuestActions.logOut());
    this.router.navigate(['/logout']);
  }
}
