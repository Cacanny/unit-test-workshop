import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../store/feature/insura-quest.feature';
import { InsuraQuestActions } from '../../store/actions/insura-quest.actions';
import { Creature } from '../../store/insura-quest.types';

@Injectable({
  providedIn: 'root',
})
export class CreatureListResolverService implements Resolve<Creature[]> {
  store = inject(Store);

  resolve(): Observable<Creature[]> {
    return this.store.select(insuraQuestFeature.selectCreatures).pipe(
      tap((creatures) => {
        if (creatures.length === 0) {
          this.store.dispatch(InsuraQuestActions.getCreatures());
        }
      }),
      map((creatures) => creatures),
      take(1),
    );
  }
}
