/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { SubmitClaim } from '../../features/claims/submit-claim/submit-claim.types';
import {
  mockClaimsProcessingHistory,
  mockCreatures,
  mockFraudeDetectionCases,
  mockInsuranceClaims,
} from '../../services/api/api-insura-quest.mocks';
import { InsuraQuestService } from '../../services/api/api-insura-quest.service';
import { InsuranceClaimService } from '../../services/insurance-claim/insurance-claim.service';
import { ProgressionService } from '../../services/progression/progression.service';
import {
  creatureMock,
  insurancePendingClaim,
  userMock,
} from '../../testing-utils/testing.mocks';
import { InsuraQuestActions } from '../actions/insura-quest.actions';
import { insuraQuestFeature } from '../feature/insura-quest.feature';
import { InsuranceActionType, User } from '../insura-quest.types';
import { InsuraQuestEffects } from './insura-quest.effects';

class MockInsuraQuestService {
  login = jasmine.createSpy();
  getCreatures = jasmine.createSpy();
  getInsuranceClaims = jasmine.createSpy();
  getFraudeDetectionCases = jasmine.createSpy();
  getClaimsProcessingHistory = jasmine.createSpy();
}

class MockInsuranceClaimService {
  alterClaimStatus = jasmine.createSpy();
  submitClaim = jasmine.createSpy();
  createNewClaim = jasmine.createSpy();
}

class MockProgressionService {
  calculateProgressToNextLevel = jasmine.createSpy().and.returnValue(100);
  getNextLevelXP = jasmine.createSpy().and.returnValue(200);
  earnXP = jasmine.createSpy().and.returnValue({
    earnedXP: 100,
    newTotalXP: 150,
    progressionState: {
      level: 4,
      levelDescription: 'Fraud Specialist (Level 4)',
    },
    generatedString: 'generated',
  });
}

describe('InsuraQuestEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: InsuraQuestEffects;
  let insuraQuestService: MockInsuraQuestService;
  let insuranceClaimService: MockInsuranceClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InsuraQuestEffects,
        provideMockStore({
          selectors: [
            {
              selector: insuraQuestFeature.selectLoggedInUser,
              value: userMock(),
            },
            {
              selector: insuraQuestFeature.selectInsuranceClaims,
              value: mockInsuranceClaims(),
            },
            {
              selector: insuraQuestFeature.selectInsuranceClaimById(301),
              value: insurancePendingClaim(),
            },
            {
              selector: insuraQuestFeature.selectCreatures,
              value: mockCreatures(),
            },
            {
              selector: insuraQuestFeature.selectCreatureById(1),
              value: creatureMock(),
            },
          ],
        }),
        provideMockActions(() => actions$),
        { provide: InsuraQuestService, useClass: MockInsuraQuestService },
        { provide: InsuranceClaimService, useClass: MockInsuranceClaimService },
        { provide: ProgressionService, useClass: MockProgressionService },
      ],
    });

    effects = TestBed.inject(InsuraQuestEffects);
    insuraQuestService = TestBed.inject<MockInsuraQuestService>(
      InsuraQuestService as any,
    );
    insuranceClaimService = TestBed.inject<MockInsuranceClaimService>(
      InsuranceClaimService as any,
    );
  });

  describe('loadLogIn$', () => {
    it('should dispatch loginSuccess when login is successful and user is not null', () => {
      const username = 'testUser';
      const password = 'testPassword';
      const user: User = {
        id: 1,
        name: 'Test User',
        xp: 100,
        level: 1,
        progress: 50,
        nextLevelXP: 200,
        claimsProcessed: 0,
        fraudeCasesSolved: 0,
        xpHistory: [],
        avatarUrl: '',
        levelDescription: '',
        password: '',
        profileUrl: '',
        role: 'admin',
        username: 'test-user',
      };

      const action = InsuraQuestActions.login({ username, password });
      const completion = InsuraQuestActions.loginSuccess({
        user: {
          ...user,
          progress: 100,
          nextLevelXP: 200,
        },
      });

      actions$ = hot('-a-', { a: action });
      insuraQuestService.login.and.returnValue(cold('-a', { a: user }));

      const expected = cold('--b', { b: completion });

      expect(effects.loadLogIn$).toBeObservable(expected);
    });

    it('should return loginFailure when user is null', () => {
      const username = 'testUser';
      const password = 'testPassword';

      const action = InsuraQuestActions.login({ username, password });
      const completion = InsuraQuestActions.loginFailure();

      actions$ = hot('-a-', { a: action });
      insuraQuestService.login.and.returnValue(cold('-a', { a: null }));

      const expected = cold('--b', { b: completion });

      expect(effects.loadLogIn$).toBeObservable(expected);
    });

    it('should dispatch loginFailure when service call is failed', () => {
      const username = 'testUser';
      const password = 'testPassword';

      const action = InsuraQuestActions.login({ username, password });
      const completion = InsuraQuestActions.loginFailure();

      actions$ = hot('-a-', { a: action });
      insuraQuestService.login.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadLogIn$).toBeObservable(expected);
    });
  });

  describe('loadCreatures$', () => {
    it('should dispatch getCreaturesSuccess when getCreatures is successful', () => {
      const action = InsuraQuestActions.getCreatures();
      const completion = InsuraQuestActions.getCreaturesSuccess({
        creatures: mockCreatures(),
      });

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getCreatures.and.returnValue(
        cold('-a', { a: mockCreatures() }),
      );

      const expected = cold('--b', { b: completion });

      expect(effects.loadCreatures$).toBeObservable(expected);
    });

    it('should dispatch getCreaturesFailure when service call is failed', () => {
      const action = InsuraQuestActions.getCreatures();
      const completion = InsuraQuestActions.getCreaturesFailure();

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getCreatures.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadCreatures$).toBeObservable(expected);
    });
  });

  describe('loadInsuranceClaims$', () => {
    it('should dispatch getInsuranceClaimsSuccess when getInsuranceClaims is successful', () => {
      const action = InsuraQuestActions.getInsuranceClaims();
      const completion = InsuraQuestActions.getInsuranceClaimsSuccess({
        insuranceClaims: mockInsuranceClaims() as any,
      });

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getInsuranceClaims.and.returnValue(
        cold('-a', { a: mockInsuranceClaims() }),
      );

      const expected = cold('--b', { b: completion });

      expect(effects.loadInsuranceClaims$).toBeObservable(expected);
    });

    it('should dispatch getInsuranceClaimsFailure when service call is failed', () => {
      const action = InsuraQuestActions.getInsuranceClaims();
      const completion = InsuraQuestActions.getInsuranceClaimsFailure();

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getInsuranceClaims.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadInsuranceClaims$).toBeObservable(expected);
    });
  });

  describe('loadFraudDetectionCases$', () => {
    it('should dispatch getFraudDetectionCasesSuccess when getFraudDetectionCases is successful', () => {
      const action = InsuraQuestActions.getFraudDetectionCases();
      const completion = InsuraQuestActions.getFraudDetectionCasesSuccess({
        fraudDetectionCases: mockFraudeDetectionCases() as any,
      });

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getFraudeDetectionCases.and.returnValue(
        cold('-a', { a: mockFraudeDetectionCases() }),
      );

      const expected = cold('--b', { b: completion });

      expect(effects.loadFraudDetectionCases$).toBeObservable(expected);
    });

    it('should dispatch getFraudDetectionCasesFailure when service call is failed', () => {
      const action = InsuraQuestActions.getFraudDetectionCases();
      const completion = InsuraQuestActions.getFraudDetectionCasesFailure();

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getFraudeDetectionCases.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadFraudDetectionCases$).toBeObservable(expected);
    });
  });

  describe('loadAlterClaimStatus$', () => {
    it('should dispatch alterInsuranceClaimSuccess when alterClaimStatus is successful', () => {
      const status = InsuranceActionType.APPROVED;
      const claimId = 1;
      const notice = 'Approved claim';
      const action = InsuraQuestActions.alterInsuranceClaim({
        status,
        claimId,
        notice,
      });
      const completion = InsuraQuestActions.alterInsuranceClaimSuccess({
        status,
        claimId,
        notice,
      });

      actions$ = hot('-a-', { a: action });
      insuranceClaimService.alterClaimStatus.and.returnValue(
        cold('-a', { a: {} }),
      );

      const expected = cold('--b', { b: completion });

      expect(effects.loadAlterClaimStatus$).toBeObservable(expected);
    });

    it('should dispatch alterInsuranceClaimFailure when service call is failed', () => {
      const status = InsuranceActionType.APPROVED;
      const claimId = 1;
      const notice = 'Approved claim';
      const action = InsuraQuestActions.alterInsuranceClaim({
        status,
        claimId,
        notice,
      });
      const completion = InsuraQuestActions.alterInsuranceClaimFailure();

      actions$ = hot('-a-', { a: action });
      insuranceClaimService.alterClaimStatus.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadAlterClaimStatus$).toBeObservable(expected);
    });
  });

  describe('loadUpdateClaimHistoryProgress$', () => {
    it('should dispatch updateClaimsHistoryProgress with correct data', () => {
      const status = InsuranceActionType.APPROVED;
      const claimId = 1;
      const notice = 'Approved claim';
      const user = userMock();
      const action = InsuraQuestActions.alterInsuranceClaimSuccess({
        status,
        claimId,
        notice,
      });
      const completion = InsuraQuestActions.updateClaimsHistoryProgress({
        claimsProcessingHistory: {
          claimId,
          decision: status,
          notes: notice,
          processedBy: user.name,
        },
      });

      actions$ = hot('-a-', { a: action });

      const expected = cold('-b', { b: completion });

      expect(effects.loadUpdateClaimHistoryProgress$).toBeObservable(expected);
    });
  });

  describe('loadClaimsProgressionHistory$', () => {
    it('should dispatch getClaimsProcessingHistorySuccess when getClaimsProcessingHistory is successful', () => {
      const action = InsuraQuestActions.getClaimProcessingHistory();
      const completion = InsuraQuestActions.getClaimsProcessingHistorySuccess({
        claimsProcessingHistory: mockClaimsProcessingHistory() as any,
      });

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getClaimsProcessingHistory.and.returnValue(
        cold('-a', { a: mockClaimsProcessingHistory() }),
      );

      const expected = cold('--b', { b: completion });

      expect(effects.loadClaimsProgressionHistory$).toBeObservable(expected);
    });

    it('should dispatch getClaimsProcessingHistoryFailure when service call is failed', () => {
      const action = InsuraQuestActions.getClaimProcessingHistory();
      const completion = InsuraQuestActions.getClaimsProcessingHistoryFailure();

      actions$ = hot('-a-', { a: action });
      insuraQuestService.getClaimsProcessingHistory.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadClaimsProgressionHistory$).toBeObservable(expected);
    });
  });

  describe('loadCalculateProgressionForUser$', () => {
    it('should dispatch progressionUpdate when alterInsuranceClaimSuccess is successful', () => {
      const action = InsuraQuestActions.alterInsuranceClaimSuccess({
        claimId: 301,
        notice: '',
        status: InsuranceActionType.APPROVED,
      });

      const updatedUser = {
        ...userMock(),
        claimsProcessed: 51,
        xp: 150,
        nextLevelXP: 200,
        progress: 100,
        xpHistory: [
          {
            id: 1,
            description: 'generated',
            xp: 100,
          },
        ],
      };

      const completion = InsuraQuestActions.progressionUpdate({
        updatedUser,
      });

      actions$ = hot('-a-', { a: action });

      const expected = cold('-b', { b: completion });

      expect(effects.loadCalculateProgressionForUser$).toBeObservable(expected);
    });
  });

  describe('loadSubmitClaim$', () => {
    it('should dispatch submitClaimSuccess when submitClaim is successful', () => {
      const claim: SubmitClaim = {
        amount: 100,
        creature: 101,
        description: '',
        title: '',
      };
      const action = InsuraQuestActions.submitClaim({ claim });
      const completion = InsuraQuestActions.submitClaimSuccess({
        claim: insurancePendingClaim(),
      });

      actions$ = hot('-a-', { a: action });

      insuranceClaimService.submitClaim.and.returnValue(
        cold('-a', { a: true }),
      );
      insuranceClaimService.createNewClaim.and.returnValue(
        insurancePendingClaim(),
      );

      const expected = cold('--b', { b: completion });

      expect(effects.loadSubmitClaim$).toBeObservable(expected);
    });

    it('should dispatch failure when submitClaim is error', () => {
      const claim: SubmitClaim = {
        amount: 100,
        creature: 101,
        description: '',
        title: '',
      };
      const action = InsuraQuestActions.submitClaim({ claim });
      const completion = InsuraQuestActions.submitClaimFailure();

      actions$ = hot('-a-', { a: action });

      insuranceClaimService.submitClaim.and.returnValue(cold('-#'));

      const expected = cold('--b', { b: completion });

      expect(effects.loadSubmitClaim$).toBeObservable(expected);
    });
  });
});
