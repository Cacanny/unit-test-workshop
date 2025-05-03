import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FacadeService } from '../../../store/facade.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  facade = inject(FacadeService);
  destroy$ = inject(DestroyRef);

  loggedInUser$ = this.facade.loggedInUser$;
  pendingClaims$ = this.facade.pendingClaims$;
  insuranceClaimsLoadingState$ = this.facade.insuranceClaimsLoadingState$;
  fraudDetectionCases$ = this.facade.fraudeDetectionCases$;
  fraudDetectionCasesLoadingState$ =
    this.facade.fraudDetectionCasesLoadingState$;

  ngOnInit() {
    this.initializeInsuranceClaimsLoading();
    this.initializeFraudDetectionCasesLoading();
  }

  initializeInsuranceClaimsLoading(): void {
    this.insuranceClaimsLoadingState$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.facade.getInsuranceClaims();
        }
      });
  }

  initializeFraudDetectionCasesLoading(): void {
    this.fraudDetectionCasesLoadingState$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.facade.getFraudDetectionCases();
        }
      });
  }
}
