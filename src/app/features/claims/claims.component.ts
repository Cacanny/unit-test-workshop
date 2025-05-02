import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../store/feature/insura-quest.feature';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InsuraQuestActions } from '../../store/actions/insura-quest.actions';
import { InsuranceClaimDetail } from './claims-detail.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-claims',
  standalone: false,
  templateUrl: './claims.component.html',
})
export class ClaimsComponent implements OnInit {
  store = inject(Store);
  destroy$ = inject(DestroyRef);

  insuranceClaims$: Observable<InsuranceClaimDetail[]> = this.store.select(
    insuraQuestFeature.selectInsuranceDetailClaims,
  );

  ngOnInit(): void {
    this.store
      .select(insuraQuestFeature.selectInsuranceClaimsLoadingState)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.store.dispatch(InsuraQuestActions.getInsuranceClaims());
        }
      });

    this.store
      .select(insuraQuestFeature.selectCreaturesLoadingState)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.store.dispatch(InsuraQuestActions.getCreatures());
        }
      });
  }
}
