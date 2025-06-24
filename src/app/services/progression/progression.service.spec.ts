import { ProgressionService } from './progression.service';

describe('ProgressionService', () => {
  let service: ProgressionService;

  beforeEach(() => {
    // Reset the service before each test
  });

  it('should be created', () => {
    service = new ProgressionService();

    expect(service).toBeTruthy();
  });

  describe('getNextLevelXP', () => {
    it('should return correct XP threshold for level 3', () => {
      service = new ProgressionService();

      const xp = service.getNextLevelXP(3);

      expect(xp).toBe(500);
    });

    it('should return default XP threshold for unknown level', () => {
      service = new ProgressionService();

      const xp = service.getNextLevelXP(10);

      expect(xp).toBe(2000);
    });
  });
});
