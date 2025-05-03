import {
  Creature,
  FraudRisk,
  InsuranceActionType,
  InsuranceClaim,
  User,
} from '../store/insura-quest.types';

export const creatureMock = (): Creature => ({
  id: 101,
  name: 'Flamewing the Dragon',
  species: 'Dragon',
  insurancePolicy: 'Fire Damage, Hoard Theft',
  claims: [301, 302],
  imageUrl: 'assets/dragon.png',
});

export const insurancePendingClaim = (): InsuranceClaim => ({
  amountRequested: 1000,
  clientId: 101,
  description: 'Mock Description',
  fraudRisk: FraudRisk.LOW,
  id: 301,
  imageUrl: 'assets/trial',
  status: InsuranceActionType.PENDING,
  title: 'Mock Title',
  claimProcessingHistory: [],
});

export const insuranceApprovedClaim = (): InsuranceClaim => ({
  amountRequested: 1000,
  clientId: 101,
  description: 'Mock Description',
  fraudRisk: FraudRisk.MEDIUM,
  id: 302,
  imageUrl: 'assets/trial',
  status: InsuranceActionType.APPROVED,
  title: 'Mock Title',
  claimProcessingHistory: [],
});

export const insuranceFlaggedFraudClaim = (): InsuranceClaim => ({
  amountRequested: 1000,
  clientId: 101,
  description: 'Mock Description',
  fraudRisk: FraudRisk.HIGH,
  id: 303,
  imageUrl: 'assets/trial',
  status: InsuranceActionType.FLAG_FRAUD,
  title: 'Mock Title',
  claimProcessingHistory: [],
});

export const userMock = (): User => ({
  id: 3,
  username: 'admin_alice@insuraquest.com',
  name: 'Witch Alice',
  level: 4,
  claimsProcessed: 50,
  fraudeCasesSolved: 3,
  role: 'admin',
  avatarUrl: 'assets/witch-avatar.png',
  profileUrl: 'assets/witch.png',
  password: 'adminpass789',
  xp: 500,
  levelDescription: 'Fraud Specialist (Level 4)',
  nextLevelXP: 1000,
  progress: 50,
  xpHistory: [],
});
