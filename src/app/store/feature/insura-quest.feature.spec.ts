/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitClaim } from '../../features/claims/submit-claim/submit-claim.types';
import {
  mockCreatures,
  mockInsuranceClaims,
} from '../../services/api/api-insura-quest.mocks';
import {
  insurancePendingClaim,
  userMock,
} from '../../testing-utils/testing.mocks';
import { InsuraQuestActions } from '../actions/insura-quest.actions';
import {
  createLoadingStatus,
  InsuranceActionType,
  LoadingStatusType,
} from '../insura-quest.types';
import { insuraQuestFeature, InsuraQuestState } from './insura-quest.feature';

describe('InsuraQuest Feature', () => {
  let initialState: InsuraQuestState;

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      loggedInUser: userMock(),
      creatures: [],
      creaturesLoadingState: createLoadingStatus(LoadingStatusType.IDLE),
      insuranceClaims: [],
      insuranceClaimsLoadingState: createLoadingStatus(LoadingStatusType.IDLE),
      fraudeDetectionCases: [],
      fraudeDetectionCasesLoadingState: createLoadingStatus(
        LoadingStatusType.IDLE,
      ),
      claimsProcessionHistoryLoadingStatus: createLoadingStatus(
        LoadingStatusType.IDLE,
      ),
      alterInsuranceClaimStatus: createLoadingStatus(LoadingStatusType.IDLE),
      submitClaimStatus: createLoadingStatus(LoadingStatusType.IDLE),
    };
  });

  describe('featureReducer', () => {
    it('should set isLoggedIn to true and set loggedInUser on loginSuccess', () => {
      const user = { id: 1, name: 'John Doe', role: 'admin' } as any;
      const action = InsuraQuestActions.loginSuccess({ user });
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.isLoggedIn).toBe(true);
      expect(state.loggedInUser).toEqual(user);
    });

    it('should reset isLoggedIn and loggedInUser on loginFailure', () => {
      const action = InsuraQuestActions.loginFailure();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.isLoggedIn).toBe(false);
      expect(state.loggedInUser).toBeNull();
    });

    it('should set isLoggedIn to false and set loggedInUser to null on logout', () => {
      const user = null;
      const action = InsuraQuestActions.logOut();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.isLoggedIn).toBe(false);
      expect(state.loggedInUser).toEqual(user);
    });

    it('should update creaturesLoadingState to LOADING on getCreatures', () => {
      const action = InsuraQuestActions.getCreatures();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.creaturesLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.LOADING),
      );
    });

    it('should update creatures and set creaturesLoadingState to SUCCESS on getCreaturesSuccess', () => {
      const creatures = [{ id: 1, name: 'Dragon' }] as any;
      const action = InsuraQuestActions.getCreaturesSuccess({ creatures });
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.creatures).toEqual(creatures);
      expect(state.creaturesLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );
    });

    it('should set creaturesLoadingState to ERROR on getCreaturesFailure', () => {
      const action = InsuraQuestActions.getCreaturesFailure();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.creaturesLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.ERROR),
      );
    });

    it('should update insuranceClaimsLoadingState to LOADING on getInsuranceClaims', () => {
      const action = InsuraQuestActions.getInsuranceClaims();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.insuranceClaimsLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.LOADING),
      );
    });

    it('should update insuranceClaims and set insuranceClaimsLoadingState to SUCCESS on getInsuranceClaimsSuccess', () => {
      const insuranceClaims = [
        { id: 1, clientId: 1, status: 'PENDING' },
      ] as any;
      const action = InsuraQuestActions.getInsuranceClaimsSuccess({
        insuranceClaims,
      });
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.insuranceClaims).toEqual(insuranceClaims);
      expect(state.insuranceClaimsLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );
    });

    it('should set insuranceClaimsLoadingState to ERROR on getInsuranceClaimsFailure', () => {
      const action = InsuraQuestActions.getInsuranceClaimsFailure();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.insuranceClaimsLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.ERROR),
      );
    });

    it('should reset state to initialState on clear', () => {
      const modifiedState = {
        ...initialState,
        isLoggedIn: false,
        loggedInUser: null,
      };
      const action = InsuraQuestActions.clear();
      const state = insuraQuestFeature.reducer(modifiedState, action);

      expect(state).toEqual(modifiedState);
    });

    it('should update alterInsuranceClaimStatus to LOADING on alterInsuranceClaim', () => {
      const action = InsuraQuestActions.alterInsuranceClaim({
        claimId: 101,
        notice: '',
        status: InsuranceActionType.PENDING,
      });
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.alterInsuranceClaimStatus).toEqual(
        createLoadingStatus(LoadingStatusType.LOADING),
      );
    });

    it('should update insuranceClaims and set alterInsuranceClaimStatus to SUCCESS on alterInsuranceClaimSuccess', () => {
      const claimId = 1;
      const status = InsuranceActionType.APPROVED;
      const insuranceClaims = [{ id: 1, status: 'PENDING' }] as any;
      const modifiedState = { ...initialState, insuranceClaims };
      const action = InsuraQuestActions.alterInsuranceClaimSuccess({
        claimId,
        notice: '',
        status,
      });
      const state = insuraQuestFeature.reducer(modifiedState, action);

      expect(state.alterInsuranceClaimStatus).toEqual(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );
      expect(state.insuranceClaims[0].status).toBe(status);
    });

    it('should update submitClaimStatus to LOADING on submitClaim', () => {
      const submitClaim: SubmitClaim = {
        amount: 1,
        creature: 101,
        description: '',
        title: '',
      };
      const action = InsuraQuestActions.submitClaim({ claim: submitClaim });
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.submitClaimStatus).toEqual(
        createLoadingStatus(LoadingStatusType.LOADING),
      );
    });

    it('should add a new claim, update creatures, and set submitClaimStatus to SUCCESS on submitClaimSuccess', () => {
      const claim = { id: 1, clientId: 1 } as any;
      const creatures = [{ id: 1, claims: [] }] as any;
      const modifiedState = { ...initialState, creatures };
      const action = InsuraQuestActions.submitClaimSuccess({ claim });
      const state = insuraQuestFeature.reducer(modifiedState, action);

      expect(state.submitClaimStatus).toEqual(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );
      expect(state.insuranceClaims).toContain(claim);
      expect(state.creatures[0].claims).toContain(claim.id);
    });

    it('should update claimsProcessionHistoryLoadingStatus to LOADING on getClaimProcessingHistory', () => {
      const action = InsuraQuestActions.getClaimProcessingHistory();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.claimsProcessionHistoryLoadingStatus).toEqual(
        createLoadingStatus(LoadingStatusType.LOADING),
      );
    });

    it('should update claimsProcessionHistoryLoadingStatus to SUCCESS and update insuranceClaims on getClaimsProcessingHistorySuccess', () => {
      const claimsProcessingHistory = [
        { claimId: 1, processedBy: 'John Doe' },
      ] as any;
      const insuranceClaims = [{ id: 1 }] as any;
      const modifiedState = { ...initialState, insuranceClaims };
      const action = InsuraQuestActions.getClaimsProcessingHistorySuccess({
        claimsProcessingHistory,
      });
      const state = insuraQuestFeature.reducer(modifiedState, action);

      expect(state.claimsProcessionHistoryLoadingStatus).toEqual(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );
      expect(state.insuranceClaims[0].claimProcessingHistory).toEqual(
        claimsProcessingHistory,
      );
    });

    it('should update insuranceClaims with new claimsProcessingHistory on updateClaimsHistoryProgress', () => {
      const claimsProcessingHistory = {
        claimId: 1,
        processedBy: 'John Doe',
      } as any;
      const insuranceClaims = [{ id: 1, claimProcessingHistory: [] }] as any;
      const modifiedState = { ...initialState, insuranceClaims };
      const action = InsuraQuestActions.updateClaimsHistoryProgress({
        claimsProcessingHistory,
      });
      const state = insuraQuestFeature.reducer(modifiedState, action);

      expect(state.insuranceClaims[0].claimProcessingHistory).toContain(
        claimsProcessingHistory,
      );
    });

    it('should update fraudeDetectionCasesLoadingState to LOADING on getFraudDetectionCases', () => {
      const action = InsuraQuestActions.getFraudDetectionCases();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.fraudeDetectionCasesLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.LOADING),
      );
    });

    it('should update fraudeDetectionCases and set fraudeDetectionCasesLoadingState to SUCCESS on getFraudDetectionCasesSuccess', () => {
      const fraudDetectionCases = [{ id: 1, description: 'Fraud Case' }] as any;
      const action = InsuraQuestActions.getFraudDetectionCasesSuccess({
        fraudDetectionCases,
      });
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.fraudeDetectionCases).toEqual(fraudDetectionCases);
      expect(state.fraudeDetectionCasesLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );
    });

    it('should set fraudeDetectionCasesLoadingState to ERROR on getFraudDetectionCasesFailure', () => {
      const action = InsuraQuestActions.getFraudDetectionCasesFailure();
      const state = insuraQuestFeature.reducer(initialState, action);

      expect(state.fraudeDetectionCasesLoadingState).toEqual(
        createLoadingStatus(LoadingStatusType.ERROR),
      );
    });

    it('should update loggedInUser on progressionUpdate', () => {
      const updatedUser = { name: 'Jane Doe', role: 'user' } as any;
      const loggedInUser = { id: 1, name: 'John Doe', role: 'admin' } as any;
      const modifiedState = { ...initialState, loggedInUser };
      const action = InsuraQuestActions.progressionUpdate({ updatedUser });
      const state = insuraQuestFeature.reducer(modifiedState, action);

      expect(state.loggedInUser).toEqual({ ...loggedInUser, ...updatedUser });
    });
  });

  describe('extraSelectors', () => {
    describe('selectLoggedInUserRole', () => {
      it('should return logged in role: admin', () => {
        const result = insuraQuestFeature.selectLoggedInUserRole.projector(
          initialState.loggedInUser,
        );

        expect(result).toBe('admin');
      });
    });

    describe('selectPendingClaims', () => {
      it('should all insurances with pending as status', () => {
        const pendingCases = [
          {
            ...insurancePendingClaim(),
          },
          {
            ...insurancePendingClaim(),
          },
        ];

        const result =
          insuraQuestFeature.selectPendingClaims.projector(pendingCases);

        expect(result.length).toBe(2);
      });
    });

    describe('selectInsuranceDetailClaims', () => {
      it('should return detail and append name of creature', () => {
        const result = insuraQuestFeature.selectInsuranceDetailClaims.projector(
          mockInsuranceClaims() as any,
          mockCreatures(),
        );

        expect(result).toEqual([
          {
            ...(mockInsuranceClaims()[0] as any),
            policyHolderName: 'Flamewing the Dragon',
          },
        ]);
      });
    });

    describe('selectInsuranceDetailClaimsByUserIdAndUser ', () => {
      it('should all return all insurance that contain history of the user name', () => {
        const insuranceClaims = mockInsuranceClaims() as any;
        const user = userMock();

        insuranceClaims[0].claimProcessingHistory = [
          {
            claimId: 101,
            processedBy: 'Witch Alice',
            decision: InsuranceActionType.APPROVED,
            notes: 'string',
          },
        ];

        const result =
          insuraQuestFeature.selectInsuranceDetailClaimsByUserIdAndUser.projector(
            insuranceClaims,
            user,
          );

        expect(result).toEqual({ insuranceClaims, user });
      });
    });

    describe('selectInsuranceClaimsByUserId', () => {
      it('should all insurances with pending as status', () => {
        const insuranceClaims = mockInsuranceClaims() as any;

        const result = insuraQuestFeature
          .selectInsuranceClaimsByUserId(101)
          .projector(insuranceClaims);

        expect(result).toEqual(insuranceClaims);
      });
    });
  });
});
