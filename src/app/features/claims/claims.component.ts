import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { InsuranceClaimDetail } from './claims-detail.types';

@Component({
  selector: 'app-claims',
  standalone: false,
  templateUrl: './claims.component.html',
})
export class ClaimsComponent implements OnInit {
  facadeService = inject(FacadeService);
  destroy$ = inject(DestroyRef);

  insuranceClaims$: Observable<InsuranceClaimDetail[]> =
    this.facadeService.insuranceDetailClaims$;

  ngOnInit(): void {
    this.facadeService.insuranceClaimsLoadingState$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.facadeService.getInsuranceClaims();
        }
      });

    this.facadeService.creaturesLoadingState$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.facadeService.getCreatures();
        }
      });
  }
}
