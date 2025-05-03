/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed, waitForAsync } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { Creature } from '../../store/insura-quest.types';
import { creatureMock } from '../../testing-utils/testing.mocks';
import { CreatureListResolverService } from './creature-list-resolver.service';

class MockFacadeService {
  creatures$ = new BehaviorSubject<Creature[]>([creatureMock()]);
  getCreatures = jasmine.createSpy();
}

describe('CreatureListResolverService', () => {
  let service: CreatureListResolverService;
  let facade: MockFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatureListResolverService,
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(CreatureListResolverService);
    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
  }));

  describe('when the array is filled with creatures', () => {
    it('should return observable with creatures in it', () => {
      const result = service.resolve();

      const expectedResult = cold('(a|)', { a: [creatureMock()] });

      expect(result).toBeObservable(expectedResult);
    });
  });

  describe('when the creatures are empty', () => {
    it('should return empty creatures list and should call getCreatures', () => {
      facade.creatures$.next([]);

      const result = service.resolve();

      const expectedResult = cold('(a|)', { a: [] });

      expect(result).toBeObservable(expectedResult);
      expect(facade.getCreatures).toHaveBeenCalled();
    });
  });
});
