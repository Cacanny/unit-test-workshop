import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InsuranceClaim } from '../../../store/insura-quest.types';
import { Store } from '@ngrx/store';
import { InsuraQuestActions } from '../../../store/actions/insura-quest.actions';
import { BehaviorSubject, Observable } from 'rxjs';
import { insuraQuestFeature } from '../../../store/feature/insura-quest.feature';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InsuranceClaimService } from '../../../services/insurance-claim/insurance-claim.service';

@Component({
  selector: 'app-claims-detail',
  standalone: false,
  templateUrl: './claims-detail.component.html',
})
export class ClaimsDetailComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  destroy$ = inject(DestroyRef);
  service = inject(InsuranceClaimService);

  spinner$ = new BehaviorSubject(false);

  claimId!: number;

  insuranceClaim$!: Observable<InsuranceClaim | null>;

  loadingStatus$ = this.store.select(
    insuraQuestFeature.selectAlterInsuranceClaimStatus,
  );

  formGroup: FormGroup = new FormGroup(
    {
      notice: new FormControl('', [Validators.required]),
    },
    { updateOn: 'blur' },
  );

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.claimId = idParam !== null ? +idParam : 0;

    if (this.claimId !== null) {
      this.getClaimsProgressHistory();

      this.insuranceClaim$ = this.store.select(
        insuraQuestFeature.selectInsuranceClaimById(this.claimId),
      );
    }
  }

  approveClaim(): void {
    if (this.validateFormvalues()) {
      const formValue = this.getFormValue();

      this.service.approveClaim(this.claimId, formValue);
    }
  }

  rejectClaim(): void {
    if (this.validateFormvalues()) {
      const formValue = this.getFormValue();

      this.service.rejectClaim(this.claimId, formValue);
    }
  }

  resolveFraud(): void {
    if (this.validateFormvalues()) {
      const formValue = this.getFormValue();

      this.service.resolveFraud(this.claimId, formValue);
    }
  }

  markAsFraud(): void {
    if (this.validateFormvalues()) {
      const formValue = this.getFormValue();

      this.service.markAsFraud(this.claimId, formValue);
    }
  }

  get notice(): AbstractControl {
    return this.formGroup.controls['notice'];
  }

  private getClaimsProgressHistory() {
    this.store
      .select(insuraQuestFeature.selectClaimsProcessionHistoryLoadingStatus)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.store.dispatch(InsuraQuestActions.getClaimProcessingHistory());
        }
      });
  }

  private getFormValue(): string {
    const { notice } = this.formGroup.value;

    return notice;
  }

  private validateFormvalues() {
    return this.formGroup.valid;
  }
}
