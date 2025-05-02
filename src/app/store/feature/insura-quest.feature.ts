import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { InsuraQuestActions } from '../actions/insura-quest.actions';
import {
  createLoadingStatus,
  Creature,
  FraudDetectionCase,
  InsuranceActionType,
  InsuranceClaim,
  LoadingState,
  LoadingStatusType,
  User,
} from '../insura-quest.types';
import { InsuranceClaimDetail } from '../../features/claims/claims-detail.types';

// Define the interface for InsuraQuest
export interface InsuraQuestState {
  isLoggedIn: boolean;
  policies: string[];
  loggedInUser: User | null;
  creatures: Creature[];
  creaturesLoadingState: LoadingState;
  insuranceClaims: InsuranceClaim[];
  insuranceClaimsLoadingState: LoadingState;
  fraudeDetectionCases: FraudDetectionCase[];
  fraudeDetectionCasesLoadingState: LoadingState;
  claimsProcessionHistoryLoadingStatus: LoadingState;
  alterInsuranceClaimStatus: LoadingState;
  submitClaimStatus: LoadingState;
}

// Initial state
const initialState: InsuraQuestState = {
  isLoggedIn: false,
  policies: [],
  loggedInUser: null,
  creatures: [],
  creaturesLoadingState: createLoadingStatus(LoadingStatusType.IDLE),
  insuranceClaims: [],
  insuranceClaimsLoadingState: createLoadingStatus(LoadingStatusType.IDLE),
  fraudeDetectionCases: [],
  fraudeDetectionCasesLoadingState: createLoadingStatus(LoadingStatusType.IDLE),
  claimsProcessionHistoryLoadingStatus: createLoadingStatus(
    LoadingStatusType.IDLE,
  ),
  alterInsuranceClaimStatus: createLoadingStatus(LoadingStatusType.IDLE),
  submitClaimStatus: createLoadingStatus(LoadingStatusType.IDLE),
};

// Create reducer
const insuraQuestReducer = createReducer(
  initialState,
  on(InsuraQuestActions.load, (state, { id }) => ({ ...state, id })),
  on(InsuraQuestActions.update, (state, { insuraQuest }) => ({
    ...state,
    ...insuraQuest,
  })),
  on(InsuraQuestActions.clear, () => initialState),
  on(InsuraQuestActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    loggedInUser: user,
  })),
  on(InsuraQuestActions.loginFailure, (state) => ({
    ...state,
    isLoggedIn: false,
    loggedInUser: null,
  })),
  on(InsuraQuestActions.logOut, (state) => ({
    ...state,
    isLoggedIn: false,
    loggedInUser: null,
  })),
  on(InsuraQuestActions.getCreatures, (state) => ({
    ...state,
    creaturesLoadingState: createLoadingStatus(LoadingStatusType.LOADING),
  })),
  on(InsuraQuestActions.getCreaturesSuccess, (state, { creatures }) => ({
    ...state,
    creatures,
    creaturesLoadingState: createLoadingStatus(LoadingStatusType.SUCCESS),
  })),
  on(InsuraQuestActions.getCreaturesFailure, (state) => ({
    ...state,
    creaturesLoadingState: createLoadingStatus(LoadingStatusType.ERROR),
  })),
  on(InsuraQuestActions.getInsuranceClaims, (state) => ({
    ...state,
    insuranceClaimsLoadingState: createLoadingStatus(LoadingStatusType.LOADING),
  })),
  on(
    InsuraQuestActions.getInsuranceClaimsSuccess,
    (state, { insuranceClaims }) => ({
      ...state,
      insuranceClaims,
      insuranceClaimsLoadingState: createLoadingStatus(
        LoadingStatusType.SUCCESS,
      ),
    }),
  ),
  on(InsuraQuestActions.getInsuranceClaimsFailure, (state) => ({
    ...state,
    insuranceClaimsLoadingState: createLoadingStatus(LoadingStatusType.ERROR),
  })),
  on(InsuraQuestActions.getFraudDetectionCases, (state) => ({
    ...state,
    insuranceClaimsLoadingState: createLoadingStatus(LoadingStatusType.LOADING),
  })),
  on(
    InsuraQuestActions.getFraudDetectionCasesSuccess,
    (state, { fraudDetectionCases }) => ({
      ...state,
      fraudeDetectionCases: fraudDetectionCases,
      fraudeDetectionCasesLoadingState: createLoadingStatus(
        LoadingStatusType.SUCCESS,
      ),
    }),
  ),
  on(InsuraQuestActions.getFraudDetectionCasesFailure, (state) => ({
    ...state,
    fraudeDetectionCasesLoadingState: createLoadingStatus(
      LoadingStatusType.ERROR,
    ),
  })),
  on(InsuraQuestActions.progressionUpdate, (state, { updatedUser }) => ({
    ...state,
    loggedInUser: {
      ...state.loggedInUser,
      ...updatedUser,
    },
  })),
  on(InsuraQuestActions.alterInsuranceClaim, (state) => ({
    ...state,
    alterInsuranceClaimStatus: createLoadingStatus(LoadingStatusType.LOADING),
  })),
  on(
    InsuraQuestActions.alterInsuranceClaimSuccess,
    (state, { status, claimId }) => ({
      ...state,
      alterInsuranceClaimStatus: createLoadingStatus(LoadingStatusType.SUCCESS),
      insuranceClaims: state.insuranceClaims.map((claim) =>
        Number(claim.id) === Number(claimId) ? { ...claim, status } : claim,
      ),
    }),
  ),
  on(InsuraQuestActions.getClaimProcessingHistory, (state) => ({
    ...state,
    claimsProcessionHistoryLoadingStatus: createLoadingStatus(
      LoadingStatusType.LOADING,
    ),
  })),
  on(
    InsuraQuestActions.getClaimsProcessingHistorySuccess,
    (state, { claimsProcessingHistory }) => ({
      ...state,
      claimsProcessionHistoryLoadingStatus: createLoadingStatus(
        LoadingStatusType.SUCCESS,
      ),
      insuranceClaims: state.insuranceClaims.map((claim) => ({
        ...claim,
        claimProcessingHistory: claimsProcessingHistory.filter(
          (history) => Number(history.claimId) === Number(claim.id),
        ),
      })),
    }),
  ),
  on(
    InsuraQuestActions.updateClaimsHistoryProgress,
    (state, { claimsProcessingHistory }) => ({
      ...state,
      insuranceClaims: state.insuranceClaims.map((claim) =>
        Number(claim.id) === Number(claimsProcessingHistory.claimId)
          ? {
              ...claim,
              claimProcessingHistory: [
                ...(claim.claimProcessingHistory || []),
                claimsProcessingHistory,
              ],
            }
          : claim,
      ),
    }),
  ),
  on(InsuraQuestActions.submitClaim, (state) => ({
    ...state,
    submitClaimStatus: createLoadingStatus(LoadingStatusType.LOADING),
  })),
  on(InsuraQuestActions.submitClaimSuccess, (state, { claim }) => ({
    ...state,
    submitClaimStatus: createLoadingStatus(LoadingStatusType.SUCCESS),
    insuranceClaims: [...state.insuranceClaims, claim],
    creatures: state.creatures.map((creature) =>
      Number(creature.id) === Number(claim.clientId)
        ? {
            ...creature,
            claims: [...(creature.claims || []), claim.id],
          }
        : creature,
    ),
  })),
);

// Create feature
export const insuraQuestFeature = createFeature({
  name: 'insuraQuest',
  reducer: insuraQuestReducer,
  extraSelectors: ({
    selectLoggedInUser,
    selectInsuranceClaims,
    selectCreatures,
  }) => {
    const selectLoggedInUserRole = createSelector(
      selectLoggedInUser,
      (loggedInUser) => loggedInUser?.role || 'user',
    );
    const selectPendingClaims = createSelector(
      selectInsuranceClaims,
      (insuranceClaims) =>
        insuranceClaims.filter(
          (claim) => claim.status === InsuranceActionType.PENDING,
        ),
    );
    const selectInsuranceClaimById = (claimId: number) =>
      createSelector(
        selectInsuranceClaims,
        (insuranceClaims) =>
          insuranceClaims.find((claim) => +claim.id === claimId) || null,
      );
    const selectInsuranceDetailClaims = createSelector(
      selectInsuranceClaims,
      selectCreatures,
      (insuranceClaims, creatures) =>
        insuranceClaims.map((claim) => {
          const creature = creatures.find(
            (creature) => String(creature.id) === String(claim.clientId),
          );

          return {
            ...claim,
            policyHolderName: creature?.name || 'Unknown',
          } as InsuranceClaimDetail;
        }),
    );

    const selectInsuranceDetailClaimsByUserIdAndUser = createSelector(
      selectInsuranceClaims,
      selectLoggedInUser,
      (insuranceClaims, user) => ({
        insuranceClaims: insuranceClaims.filter((claim) =>
          claim.claimProcessingHistory?.some(
            (history) => history.processedBy === user?.name,
          ),
        ),
        user,
      }),
    );

    const selectInsuranceClaimsByUserId = (id: number) =>
      createSelector(selectInsuranceClaims, (insuranceClaims) =>
        insuranceClaims.filter(
          (insuranceClaim) => Number(insuranceClaim.clientId) === Number(id),
        ),
      );

    const selectCreatureById = (id: number) =>
      createSelector(selectCreatures, (creatures) =>
        creatures.find((creature) => String(creature.id) === String(id)),
      );

    return {
      selectLoggedInUserRole,
      selectPendingClaims,
      selectInsuranceClaimById,
      selectInsuranceDetailClaims,
      selectInsuranceDetailClaimsByUserIdAndUser,
      selectCreatureById,
      selectInsuranceClaimsByUserId,
    };
  },
});
