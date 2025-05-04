import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { InsuraQuestService } from '../../services/api/api-insura-quest.service';
import { InsuranceClaimService } from '../../services/insurance-claim/insurance-claim.service';
import { ProgressionService } from '../../services/progression/progression.service';
import { InsuraQuestActions } from '../actions/insura-quest.actions';
import { insuraQuestFeature } from '../feature/insura-quest.feature';
import { InsuranceActionType, User } from '../insura-quest.types';

@Injectable()
export class InsuraQuestEffects {
  private actions$ = inject(Actions);
  private insuraQuestService = inject(InsuraQuestService);
  private store = inject(Store);
  private insuranceClaimService = inject(InsuranceClaimService);
  private progressionService = inject(ProgressionService);

  loadLogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.login),
      exhaustMap(({ username, password }) =>
        this.insuraQuestService.login(username, password).pipe(
          map((user) => {
            if (user != null) {
              const updatedUser: User = {
                ...user,
                progress: this.progressionService.calculateProgressToNextLevel(
                  user.xp,
                  user.level,
                ),
                nextLevelXP: this.progressionService.getNextLevelXP(user.level),
              };

              return InsuraQuestActions.loginSuccess({ user: updatedUser });
            } else {
              return InsuraQuestActions.loginFailure();
            }
          }),
          catchError(() => of(InsuraQuestActions.loginFailure())),
        ),
      ),
    ),
  );

  loadCreatures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.getCreatures),
      exhaustMap(() =>
        this.insuraQuestService.getCreatures().pipe(
          map((creatures) =>
            InsuraQuestActions.getCreaturesSuccess({ creatures }),
          ),
          catchError(() => of(InsuraQuestActions.getCreaturesFailure())),
        ),
      ),
    ),
  );

  loadInsuranceClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.getInsuranceClaims),
      exhaustMap(() =>
        this.insuraQuestService.getInsuranceClaims().pipe(
          map((insuranceClaims) =>
            InsuraQuestActions.getInsuranceClaimsSuccess({ insuranceClaims }),
          ),
          catchError(() => of(InsuraQuestActions.getInsuranceClaimsFailure())),
        ),
      ),
    ),
  );

  loadFraudDetectionCases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.getFraudDetectionCases),
      exhaustMap(() =>
        this.insuraQuestService.getFraudeDetectionCases().pipe(
          map((fraudDetectionCases) =>
            InsuraQuestActions.getFraudDetectionCasesSuccess({
              fraudDetectionCases,
            }),
          ),
          catchError(() =>
            of(InsuraQuestActions.getFraudDetectionCasesFailure()),
          ),
        ),
      ),
    ),
  );

  loadAlterClaimStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.alterInsuranceClaim),
      exhaustMap(({ status, claimId, notice }) =>
        this.insuranceClaimService.alterClaimStatus().pipe(
          map(() =>
            InsuraQuestActions.alterInsuranceClaimSuccess({
              status,
              claimId,
              notice,
            }),
          ),
          catchError(() => of(InsuraQuestActions.alterInsuranceClaimFailure())),
        ),
      ),
    ),
  );

  loadUpdateClaimHistoryProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.alterInsuranceClaimSuccess),
      concatLatestFrom(() =>
        this.store.select(insuraQuestFeature.selectLoggedInUser),
      ),
      map(([{ status, claimId, notice }, user]) =>
        InsuraQuestActions.updateClaimsHistoryProgress({
          claimsProcessingHistory: {
            claimId,
            decision: status,
            notes: notice,
            processedBy: user!.name,
          },
        }),
      ),
    ),
  );

  loadCalculateProgressionForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.alterInsuranceClaimSuccess),
      concatLatestFrom(({ claimId }) => [
        this.store.select(insuraQuestFeature.selectLoggedInUser),
        this.store.select(insuraQuestFeature.selectInsuranceClaimById(claimId)),
      ]),
      exhaustMap(([{ status }, user, insuranceClaim]) => {
        const result = this.progressionService.earnXP(
          status,
          user!.xp,
          insuranceClaim!.fraudRisk,
        );

        const updatedUser: User = {
          ...user!,
          xp: result.newTotalXP,
          level: result.progressionState?.level ?? 0,
          levelDescription: result.progressionState?.levelDescription ?? '',
          claimsProcessed: user!.claimsProcessed + 1,
          fraudeCasesSolved:
            user!.fraudeCasesSolved +
            (status === InsuranceActionType.RESOLVE_FRAUD ? 1 : 0),
          progress: this.progressionService.calculateProgressToNextLevel(
            result.newTotalXP,
            result.progressionState!.level,
          ),
          nextLevelXP: this.progressionService.getNextLevelXP(
            result.progressionState!.level,
          ),
          xpHistory: [
            ...(user!.xpHistory ?? []),
            {
              id: user!.xpHistory?.length + 1,
              description: result.generatedString,
              xp: result.earnedXP,
            },
          ],
        };

        return of(InsuraQuestActions.progressionUpdate({ updatedUser }));
      }),
    ),
  );

  loadClaimsProgressionHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.getClaimProcessingHistory),
      exhaustMap(() =>
        this.insuraQuestService.getClaimsProcessingHistory().pipe(
          map((claimsProcessingHistory) =>
            InsuraQuestActions.getClaimsProcessingHistorySuccess({
              claimsProcessingHistory,
            }),
          ),
          catchError(() =>
            of(InsuraQuestActions.getClaimsProcessingHistoryFailure()),
          ),
        ),
      ),
    ),
  );

  loadSubmitClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsuraQuestActions.submitClaim),
      concatLatestFrom(({ claim }) => [
        this.store.select(insuraQuestFeature.selectInsuranceClaims),
        this.store.select(
          insuraQuestFeature.selectCreatureById(Number(claim.creature)),
        ),
        this.store.select(insuraQuestFeature.selectLoggedInUser),
      ]),
      exhaustMap(([{ claim }, insuranceClaims, creature, user]) =>
        this.insuranceClaimService.submitClaim().pipe(
          map(() =>
            InsuraQuestActions.submitClaimSuccess({
              claim: this.insuranceClaimService.createNewClaim(
                insuranceClaims,
                creature!.imageUrl,
                user!.name,
                {
                  clientId: claim.creature,
                  amount: claim.amount,
                  description: claim.description,
                  title: claim.title,
                },
              ),
            }),
          ),
          catchError(() => of(InsuraQuestActions.submitClaimFailure())),
        ),
      ),
    ),
  );
}
