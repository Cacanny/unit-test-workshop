import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import {
  ClaimProcessingHistory,
  FraudRisk,
  InsuranceActionType,
  InsuranceClaim,
} from '../../store/insura-quest.types';

@Injectable({
  providedIn: 'root',
})
export class InsuranceClaimService {
  facade = inject(FacadeService);

  delayInMs = 2000;

  //  simulate an API call with delay
  alterClaimStatus(): Observable<boolean> {
    return of(true).pipe(delay(this.delayInMs));
  }

  // simulate an API call with delay
  submitClaim(): Observable<boolean> {
    return of(true).pipe(delay(this.delayInMs));
  }

  alterInsuranceClaim(
    status: InsuranceActionType,
    claimId: number,
    notice: string,
  ) {
    this.facade.alterInsuranceClaim(status, claimId, notice);
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

  private createSubmitNewClaimProcessingHistory(
    claimId: number,
    clientId: number,
    processedBy: string,
  ): ClaimProcessingHistory {
    return {
      claimId,
      decision: InsuranceActionType.PENDING,
      notes: `Initial creation of submit for clientId: ${clientId}`,
      processedBy,
    };
  }
}
