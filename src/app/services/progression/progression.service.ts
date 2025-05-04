import { Injectable } from '@angular/core';
import { FraudRisk, InsuranceActionType } from '../../store/insura-quest.types';
import { ProgressionState } from './progression.types';

@Injectable({
  providedIn: 'root',
})
export class ProgressionService {
  earnXP(
    action: InsuranceActionType,
    currentXP: number,
    fraudRisk: FraudRisk,
  ): {
    earnedXP: number;
    newTotalXP: number;
    progressionState: ProgressionState | null;
    generatedString: string;
  } {
    const xpRewards: Record<InsuranceActionType, Record<FraudRisk, number>> = {
      Pending: { Low: 0, Medium: 0, High: 0 },
      Approved: { Low: 10, Medium: 20, High: 30 },
      Rejected: { Low: 8, Medium: 18, High: 25 },
      FlagFraud: { Low: 0, Medium: 40, High: 40 },
      ResolveFraud: { Low: 0, Medium: 50, High: 50 },
    };

    const earnedXP = Number(xpRewards[action][fraudRisk] || 0);

    const newTotalXP = Number(currentXP) + Number(earnedXP);

    const generatedString = this.generateNewXPMilestone(earnedXP, action);

    let progressionState: ProgressionState;

    try {
      progressionState = this.calculateLevel(newTotalXP);
    } catch (error) {
      console.error('Error calculating level:', error);
      return { earnedXP, newTotalXP, progressionState: null, generatedString };
    }

    return { earnedXP, newTotalXP, progressionState, generatedString };
  }

  generateNewXPMilestone(
    earnedXP: number,
    action: InsuranceActionType,
  ): string {
    switch (action) {
      case InsuranceActionType.APPROVED:
        return `✅ You earned ${earnedXP} XP for approving a claim!`;
      case InsuranceActionType.REJECTED:
        return `❌ You earned ${earnedXP} XP for rejecting a claim.`;
      case InsuranceActionType.FLAG_FRAUD:
        return `⚠️ You flagged potential fraud and earned ${earnedXP} XP!`;
      case InsuranceActionType.RESOLVE_FRAUD:
        return `🏆 Fraud resolved! You earned ${earnedXP} XP for your efforts.`;
      case InsuranceActionType.PENDING:
        return `No XP earned for pending actions.`;
      default:
        return `Action not recognized. No XP earned.`;
    }
  }

  getNextLevelXP(level: number): number {
    const levelXPThresholds: Record<number, number> = {
      1: 100,
      2: 250,
      3: 500,
      4: 1000,
      5: 2000, // Max level (future expansion)
    };
    return levelXPThresholds[level] || 2000;
  }

  calculateProgressToNextLevel(
    currentXP: number,
    currentLevel: number,
  ): number {
    const nextLevelXP = this.getNextLevelXP(currentLevel);

    return (currentXP / nextLevelXP) * 100;
  }

  private calculateLevel(currentXP: number): ProgressionState {
    if (currentXP < 0) throw new Error('Experience points cannot be negative.');

    switch (true) {
      case currentXP < 100:
        return { levelDescription: 'Apprentice Agent (Level 1)', level: 1 };
      case currentXP < 250:
        return { levelDescription: 'Junior Investigator (Level 2)', level: 2 };
      case currentXP < 500:
        return { levelDescription: 'Senior Adjuster (Level 3)', level: 3 };
      case currentXP < 1000:
        return { levelDescription: 'Fraud Specialist (Level 4)', level: 4 };
      default:
        return {
          levelDescription: 'Legendary Insurance Guardian (Level 5)',
          level: 5,
        };
    }
  }
}
