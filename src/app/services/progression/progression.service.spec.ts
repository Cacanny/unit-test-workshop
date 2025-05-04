import { FraudRisk, InsuranceActionType } from '../../store/insura-quest.types';
import { ProgressionService } from './progression.service';

describe('ProgressionService', () => {
  let service: ProgressionService;

  beforeEach(() => {
    service = new ProgressionService();
  });

  describe('earnXP', () => {
    const testCases = [
      {
        id: '1',
        action: InsuranceActionType.APPROVED,
        currentXP: 50,
        fraudRisk: FraudRisk.LOW,
        expected: {
          earnedXP: 10,
          newTotalXP: 60,
          progressionState: {
            levelDescription: 'Apprentice Agent (Level 1)',
            level: 1,
          },
          generatedString: '✅ You earned 10 XP for approving a claim!',
        },
      },
      {
        id: '2',
        action: InsuranceActionType.REJECTED,
        currentXP: 200,
        fraudRisk: FraudRisk.MEDIUM,
        expected: {
          earnedXP: 18,
          newTotalXP: 218,
          progressionState: {
            levelDescription: 'Junior Investigator (Level 2)',
            level: 2,
          },
          generatedString: '❌ You earned 18 XP for rejecting a claim.',
        },
      },
      {
        id: '3',
        action: InsuranceActionType.FLAG_FRAUD,
        currentXP: 440,
        fraudRisk: FraudRisk.HIGH,
        expected: {
          earnedXP: 40,
          newTotalXP: 480,
          progressionState: {
            levelDescription: 'Senior Adjuster (Level 3)',
            level: 3,
          },
          generatedString: '⚠️ You flagged potential fraud and earned 40 XP!',
        },
      },
      {
        id: '4',
        action: InsuranceActionType.FLAG_FRAUD,
        currentXP: 500,
        fraudRisk: FraudRisk.HIGH,
        expected: {
          earnedXP: 40,
          newTotalXP: 540,
          progressionState: {
            levelDescription: 'Fraud Specialist (Level 4)',
            level: 4,
          },
          generatedString: '⚠️ You flagged potential fraud and earned 40 XP!',
        },
      },
      {
        id: '5',
        action: InsuranceActionType.APPROVED,
        currentXP: 1200,
        fraudRisk: FraudRisk.HIGH,
        expected: {
          earnedXP: 30,
          newTotalXP: 1230,
          progressionState: {
            levelDescription: 'Legendary Insurance Guardian (Level 5)',
            level: 5,
          },
          generatedString: '✅ You earned 30 XP for approving a claim!',
        },
      },
    ];

    testCases.forEach(({ id, action, currentXP, fraudRisk, expected }) => {
      it(`testCase with id ${id}: should calculate earned XP and progression state for ${action} action with ${fraudRisk} fraud risk`, () => {
        const result = service.earnXP(action, currentXP, fraudRisk);
        expect(result.earnedXP).toBe(expected.earnedXP);
        expect(result.newTotalXP).toBe(expected.newTotalXP);
        expect(result.progressionState).toEqual(expected.progressionState);
        expect(result.generatedString).toBe(expected.generatedString);
      });
    });
  });

  describe('generateNewXPMilestone', () => {
    const testCases = [
      {
        action: InsuranceActionType.APPROVED,
        earnedXP: 10,
        expected: '✅ You earned 10 XP for approving a claim!',
      },
      {
        action: InsuranceActionType.REJECTED,
        earnedXP: 8,
        expected: '❌ You earned 8 XP for rejecting a claim.',
      },
      {
        action: InsuranceActionType.FLAG_FRAUD,
        earnedXP: 40,
        expected: '⚠️ You flagged potential fraud and earned 40 XP!',
      },
      {
        action: InsuranceActionType.RESOLVE_FRAUD,
        earnedXP: 50,
        expected: '🏆 Fraud resolved! You earned 50 XP for your efforts.',
      },
      {
        action: InsuranceActionType.PENDING,
        earnedXP: 0,
        expected: 'No XP earned for pending actions.',
      },
    ];

    testCases.forEach(({ action, earnedXP, expected }) => {
      it(`should generate correct message for ${action} action`, () => {
        const message = service.generateNewXPMilestone(earnedXP, action);
        expect(message).toBe(expected);
      });
    });
  });

  describe('getNextLevelXP', () => {
    it('should return correct XP threshold for level 3', () => {
      const xp = service.getNextLevelXP(3);
      expect(xp).toBe(500);
    });

    it('should return default XP threshold for unknown level', () => {
      const xp = service.getNextLevelXP(10);
      expect(xp).toBe(2000);
    });
  });

  describe('calculateProgressToNextLevel', () => {
    it('should calculate correct progress percentage', () => {
      const progress = service.calculateProgressToNextLevel(125, 2);
      expect(progress).toBeCloseTo(50);
    });

    it('should return 0% progress for 0 XP', () => {
      const progress = service.calculateProgressToNextLevel(0, 1);
      expect(progress).toBe(0);
    });
  });
});
