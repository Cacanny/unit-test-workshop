import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../store/feature/insura-quest.feature';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  store = inject(Store);

  isLoggedIn$ = this.store.select(insuraQuestFeature.selectIsLoggedIn);
}
