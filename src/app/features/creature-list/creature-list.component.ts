import { Component, inject } from '@angular/core';
import { insuraQuestFeature } from '../../store/feature/insura-quest.feature';
import { Observable } from 'rxjs';
import { Creature, LoadingState } from '../../store/insura-quest.types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-creature-list',
  standalone: false,
  templateUrl: './creature-list.component.html',
})
export class CreatureListComponent {
  store = inject(Store);

  creaturesLoadingStatus$: Observable<LoadingState> = this.store.select(
    insuraQuestFeature.selectCreaturesLoadingState,
  );

  creatures$: Observable<Creature[]> = this.store.select(
    insuraQuestFeature.selectCreatures,
  );
}
