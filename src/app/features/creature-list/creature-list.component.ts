import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { Creature, LoadingState } from '../../store/insura-quest.types';

@Component({
  selector: 'app-creature-list',
  standalone: false,
  templateUrl: './creature-list.component.html',
})
export class CreatureListComponent {
  facade = inject(FacadeService);

  creaturesLoadingStatus$: Observable<LoadingState> =
    this.facade.creaturesLoadingState$;

  creatures$: Observable<Creature[]> = this.facade.creatures$;
}
