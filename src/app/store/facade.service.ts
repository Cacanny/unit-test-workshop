import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubmitClaim } from '../features/claims/submit-claim/submit-claim.types';
import { InsuraQuestActions } from './actions/insura-quest.actions';
import { insuraQuestFeature } from './feature/insura-quest.feature';
import { InsuranceActionType } from './insura-quest.types';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  store = inject(Store);

  //#region  Selectors
  isLoggedIn$ = this.store.select(insuraQuestFeature.selectIsLoggedIn);
  loggedInUser$ = this.store.select(insuraQuestFeature.selectLoggedInUser);
  insuranceClaims$ = this.store.select(
    insuraQuestFeature.selectInsuranceClaims,
  );
  creatures$ = this.store.select(insuraQuestFeature.selectCreatures);
  loggedInUserRole$ = this.store.select(
    insuraQuestFeature.selectLoggedInUserRole,
  );
  pendingClaims$ = this.store.select(insuraQuestFeature.selectPendingClaims);
  insuranceClaimById$ = (id: number) =>
    this.store.select(insuraQuestFeature.selectInsuranceClaimById(id));
  creatureById$ = (id: number) =>
    this.store.select(insuraQuestFeature.selectCreatureById(Number(id)));
  insuranceClaimsByUserId$ = (id: number) =>
    this.store.select(
      insuraQuestFeature.selectInsuranceClaimsByUserId(Number(id)),
    );
  fraudeDetectionCases$ = this.store.select(
    insuraQuestFeature.selectFraudeDetectionCases,
  );
  insuranceDetailClaimsByUserIdAndUser$ = this.store.select(
    insuraQuestFeature.selectInsuranceDetailClaimsByUserIdAndUser,
  );

  insuranceDetailClaims$ = this.store.select(
    insuraQuestFeature.selectInsuranceDetailClaims,
  );
  submitClaimStatus$ = this.store.select(
    insuraQuestFeature.selectSubmitClaimStatus,
  );
  insuranceClaimsLoadingState$ = this.store.select(
    insuraQuestFeature.selectInsuranceClaimsLoadingState,
  );
  creaturesLoadingState$ = this.store.select(
    insuraQuestFeature.selectCreaturesLoadingState,
  );
  fraudDetectionCasesLoadingState$ = this.store.select(
    insuraQuestFeature.selectFraudeDetectionCasesLoadingState,
  );

  //#endregion Selectors

  //#region Actions
  login(username: string, password: string): void {
    this.store.dispatch(InsuraQuestActions.login({ username, password }));
  }

  logOut(): void {
    this.store.dispatch(InsuraQuestActions.logOut());
  }

  getCreatures(): void {
    this.store.dispatch(InsuraQuestActions.getCreatures());
  }

  getInsuranceClaims(): void {
    this.store.dispatch(InsuraQuestActions.getInsuranceClaims());
  }

  submitClaim(claim: SubmitClaim) {
    this.store.dispatch(InsuraQuestActions.submitClaim({ claim }));
  }

  getFraudDetectionCases() {
    this.store.dispatch(InsuraQuestActions.getFraudDetectionCases());
  }

  alterInsuranceClaim(
    status: InsuranceActionType,
    claimId: number,
    notice: string,
  ) {
    this.store.dispatch(
      InsuraQuestActions.alterInsuranceClaim({ status, claimId, notice }),
    );
  }

  // #endregion Actions
}
