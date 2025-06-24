import { InsuranceActionType } from '../../store/insura-quest.types';
import { InsuranceStatusDescriptionPipe } from './status.pipe';

describe('Pipe Test', () => {
  let pipe: InsuranceStatusDescriptionPipe;

  beforeEach(() => {
    // No setup needed for this pipe
    pipe = new InsuranceStatusDescriptionPipe();
  });

  it('should return "Pending" for PENDING status', () => {
    const result = pipe.transform(InsuranceActionType.PENDING);

    expect(result).toBe('Pending');
  });
});
