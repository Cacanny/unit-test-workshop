import { InsuranceClaim } from '../../store/insura-quest.types';

export interface InsuranceClaimDetail extends InsuranceClaim {
  policyHolderName: string;
}
