export interface LoadingState {
  isIdle: boolean;
  isLoading: boolean;
  hasError: boolean;
  isSuccess: boolean;
}

export enum LoadingStatusType {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export const createInitialLoadingState = (): LoadingState => ({
  isIdle: true,
  isLoading: false,
  hasError: false,
  isSuccess: false,
});

export const createLoadingStatus = (status: LoadingStatusType) => {
  return {
    isIdle: status === LoadingStatusType.IDLE,
    isLoading: status === LoadingStatusType.LOADING,
    hasError: status === LoadingStatusType.ERROR,
    isSuccess: status === LoadingStatusType.SUCCESS,
  };
};

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  avatarUrl: string;
  profileUrl: string;
  role: 'admin' | 'user';
  claimsProcessed: number;
  fraudeCasesSolved: number;
  level: number;
  xp: number;
  levelDescription: string;
  nextLevelXP: number;
  progress: number;
  xpHistory: XpHistoryMilestone[];
}

export interface XpHistoryMilestone {
  id: number;
  description: string;
  xp: number;
}

export interface Creature {
  id: number;
  name: string;
  imageUrl: string;
  insurancePolicy: string;
  species: string;
  claims: number[];
}

export interface InsuranceClaim {
  id: number;
  title: string;
  clientId: number;
  description: string;
  amountRequested: number;
  imageUrl: string;
  status: InsuranceActionType;
  fraudRisk: FraudRisk;
  claimProcessingHistory?: ClaimProcessingHistory[];
}

export interface FraudDetectionCase {
  claimId: number;
  flaggedBySystem: boolean;
  reason: string;
  riskScore: number;
}

export enum FraudRisk {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum InsuranceActionType {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  FLAG_FRAUD = 'FlagFraud',
  RESOLVE_FRAUD = 'ResolveFraud',
}

export interface ClaimProcessingHistory {
  claimId: number;
  processedBy: string;
  decision: InsuranceActionType;
  notes: string;
}
