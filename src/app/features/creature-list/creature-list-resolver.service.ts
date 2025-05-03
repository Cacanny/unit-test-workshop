import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { Creature } from '../../store/insura-quest.types';

@Injectable({
  providedIn: 'root',
})
export class CreatureListResolverService implements Resolve<Creature[]> {
  facade = inject(FacadeService);

  resolve(): Observable<Creature[]> {
    return this.facade.creatures$.pipe(
      tap((creatures) => {
        if (creatures.length === 0) {
          this.facade.getCreatures();
        }
      }),
      map((creatures) => creatures),
      take(1),
    );
  }
}
