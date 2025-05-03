import { InsuranceActionType } from '../../store/insura-quest.types';
import { InsuranceStatusDescriptionPipe } from './status.pipe';

describe('InsuranceStatusDescriptionPipe', () => {
  let pipe: InsuranceStatusDescriptionPipe;

  beforeEach(() => {
    pipe = new InsuranceStatusDescriptionPipe();
  });

  it('should return "Pending" for InsuranceActionType.PENDING', () => {
    expect(pipe.transform(InsuranceActionType.PENDING)).toBe('Pending');
  });

  it('should return "Rejected" for InsuranceActionType.REJECTED', () => {
    expect(pipe.transform(InsuranceActionType.REJECTED)).toBe('Rejected');
  });

  it('should return "Fraud Resolved" for InsuranceActionType.RESOLVE_FRAUD', () => {
    expect(pipe.transform(InsuranceActionType.RESOLVE_FRAUD)).toBe(
      'Fraud Resolved',
    );
  });

  it('should return "Approved" for InsuranceActionType.APPROVED', () => {
    expect(pipe.transform(InsuranceActionType.APPROVED)).toBe('Approved');
  });

  it('should return "Flagged for Fraud" for InsuranceActionType.FLAG_FRAUD', () => {
    expect(pipe.transform(InsuranceActionType.FLAG_FRAUD)).toBe(
      'Flagged for Fraud',
    );
  });

  it('should return "Unknown" for undefined input', () => {
    expect(pipe.transform(undefined)).toBe('Unknown');
  });

  it('should return "Unknown" for an unrecognized InsuranceActionType', () => {
    expect(
      pipe.transform('INVALID_TYPE' as unknown as InsuranceActionType),
    ).toBe('Unknown');
  });
});
