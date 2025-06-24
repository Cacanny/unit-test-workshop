import { ProgressionService } from './progression.service';

describe('ProgressionService', () => {
  let service: ProgressionService;

  beforeEach(() => {
    service = new ProgressionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
