import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InsuraQuestState } from '../feature/insura-quest.feature';
import {
  ClaimProcessingHistory,
  Creature,
  FraudDetectionCase,
  InsuranceActionType,
  InsuranceClaim,
  User,
} from '../insura-quest.types';
import { SubmitClaim } from '../../features/claims/submit-claim/submit-claim.types';

export const InsuraQuestActions = createActionGroup({
  source: 'InsuraQuest',
  events: {
    Load: props<{ id: string }>(),
    Update: props<{ insuraQuest: InsuraQuestState }>(),
    Clear: emptyProps(),
    Login: props<{ username: string; password: string }>(),
    'Log Out': emptyProps(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': emptyProps(),
    'Get Creatures': emptyProps(),
    'Get Creatures Success': props<{ creatures: Creature[] }>(),
    'Get Creatures Failure': emptyProps(),
    'Get Insurance Claims': emptyProps(),
    'Get Insurance Claims Success': props<{
      insuranceClaims: InsuranceClaim[];
    }>(),
    'Get Insurance Claims Failure': emptyProps(),
    'Get Fraud Detection Cases': emptyProps(),
    'Get Fraud Detection Cases Success': props<{
      fraudDetectionCases: FraudDetectionCase[];
    }>(),
    'Get Fraud Detection Cases Failure': emptyProps(),
    'Alter Insurance Claim': props<{
      status: InsuranceActionType;
      claimId: number;
      notice: string;
    }>(),
    'Alter Insurance Claim Success': props<{
      status: InsuranceActionType;
      claimId: number;
      notice: string;
    }>(),
    'Alter Insurance Claim Failure': emptyProps(),
    'Progression Update': props<{
      updatedUser: User;
    }>(),
    'Get Claim Processing History': emptyProps(),
    'Get Claims Processing History Success': props<{
      claimsProcessingHistory: ClaimProcessingHistory[];
    }>(),
    'Get Claims Processing History Failure': emptyProps(),
    'Update Claims History Progress': props<{
      claimsProcessingHistory: ClaimProcessingHistory;
    }>(),
    'Submit Claim': props<{ claim: SubmitClaim }>(),
    'Submit Claim Success': props<{ claim: InsuranceClaim }>(),
    'Submit Claim Failure': emptyProps(),
  },
});
