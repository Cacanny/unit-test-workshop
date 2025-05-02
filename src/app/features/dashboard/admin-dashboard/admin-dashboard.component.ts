import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../../store/feature/insura-quest.feature';
import { InsuraQuestActions } from '../../../store/actions/insura-quest.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  store = inject(Store);
  destroy$ = inject(DestroyRef);

  loggedInUser$ = this.store.select(insuraQuestFeature.selectLoggedInUser);

  pendingClaims$ = this.store.select(insuraQuestFeature.selectPendingClaims);
  insuranceClaimsLoadingState$ = this.store.select(
    insuraQuestFeature.selectInsuranceClaimsLoadingState,
  );

  fraudDetectionCases$ = this.store.select(
    insuraQuestFeature.selectFraudeDetectionCases,
  );
  fraudDetectionCasesLoadingState$ = this.store.select(
    insuraQuestFeature.selectFraudeDetectionCasesLoadingState,
  );

  ngOnInit() {
    this.initializeInsuranceClaimsLoading();
    this.initializeFraudDetectionCasesLoading();
  }

  initializeInsuranceClaimsLoading(): void {
    this.store
      .select(insuraQuestFeature.selectInsuranceClaimsLoadingState)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.store.dispatch(InsuraQuestActions.getInsuranceClaims());
        }
      });
  }

  initializeFraudDetectionCasesLoading(): void {
    this.store
      .select(insuraQuestFeature.selectFraudeDetectionCasesLoadingState)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.store.dispatch(InsuraQuestActions.getFraudDetectionCases());
        }
      });
  }
}
