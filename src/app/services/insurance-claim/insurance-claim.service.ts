import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, Observable, of } from 'rxjs';
import {
  ClaimProcessingHistory,
  FraudRisk,
  InsuranceActionType,
  InsuranceClaim,
} from '../../store/insura-quest.types';
import { InsuraQuestActions } from '../../store/actions/insura-quest.actions';

@Injectable({
  providedIn: 'root',
})
export class InsuranceClaimService {
  store = inject(Store);

  //  simulate an API call with delay
  alterClaimStatus(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }

  // simulate an API call with delay
  submitClaim(): Observable<boolean> {
    return of(true).pipe(delay(2000));
  }

  alterInsuranceClaim(
    status: InsuranceActionType,
    claimId: number,
    notice: string,
  ) {
    this.store.dispatch(
      InsuraQuestActions.alterInsuranceClaim({
        status,
        claimId,
        notice,
      }),
    );
  }

  createNewClaim(
    insuranceClaims: InsuranceClaim[],
    imageUrl: string,
    processedBy: string,
    {
      clientId,
      description,
      amount,
      title,
    }: {
      clientId: number;
      description: string;
      amount: number;
      title: string;
    },
  ): InsuranceClaim {
    const lastItemIndex = insuranceClaims.length - 1;

    const newId = insuranceClaims[lastItemIndex].id + 1;

    return {
      id: newId,
      amountRequested: amount,
      clientId,
      description,
      title,
      imageUrl,
      fraudRisk: FraudRisk.LOW,
      status: InsuranceActionType.PENDING,
      claimProcessingHistory: [
        {
          ...this.createSubmitNewClaimProcessingHistory(
            newId,
            clientId,
            processedBy,
          ),
        },
      ],
    };
  }

  createSubmitNewClaimProcessingHistory(
    claimId: number,
    clientId: number,
    processedBy: string,
  ): ClaimProcessingHistory {
    return {
      claimId,
      decision: InsuranceActionType.PENDING,
      notes: `Initial creation of submit for clientId: ${clientId} `,
      processedBy,
    };
  }

  approveClaim(claimId: number, notice: string) {
    this.alterInsuranceClaim(InsuranceActionType.APPROVED, claimId, notice);
  }

  rejectClaim(claimId: number, notice: string) {
    this.alterInsuranceClaim(InsuranceActionType.REJECTED, claimId, notice);
  }

  markAsFraud(claimId: number, notice: string) {
    this.alterInsuranceClaim(InsuranceActionType.FLAG_FRAUD, claimId, notice);
  }

  resolveFraud(claimId: number, notice: string) {
    this.alterInsuranceClaim(
      InsuranceActionType.RESOLVE_FRAUD,
      claimId,
      notice,
    );
  }
}
