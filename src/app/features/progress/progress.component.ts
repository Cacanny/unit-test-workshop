import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../store/feature/insura-quest.feature';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
})
export class ProgressComponent {
  store = inject(Store);

  selectInsuranceDetailClaimsByUserIdAndUser$ = this.store.select(
    insuraQuestFeature.selectInsuranceDetailClaimsByUserIdAndUser,
  );
}
