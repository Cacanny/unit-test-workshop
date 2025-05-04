/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../store/facade.service';
import { AuthorizationGuard } from './authorization.guard';
import { UrlService } from './url.service';

class MockFacadeService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
}

describe('AuthorizationGuard', () => {
  let service: AuthorizationGuard;
  let facade: MockFacadeService;
  let router: any;

  beforeEach(waitForAsync(() => {
    router = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthorizationGuard,
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: UrlService,
          useValue: {
            getPathName: jasmine.createSpy().and.returnValue('/mock-path'),
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(AuthorizationGuard);
    facade = TestBed.inject<MockFacadeService>(FacadeService as any);

    router = TestBed.inject(Router);
  }));

  describe('when the user is logged in', () => {
    it('should return observable true', () => {
      facade.isLoggedIn$.next(true);
      const result = service.canActivate();

      const expectedResult = cold('a', { a: true });

      expect(result).toBeObservable(expectedResult);
    });
  });

  describe('when the user is NOT logged in', () => {
    it('should return observable false and navigate away', () => {
      const result = service.canActivate();

      const expectedResult = cold('a', { a: false });

      expect(result).toBeObservable(expectedResult);
      expect(router.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { returnUrl: '/mock-path' },
      });
    });
  });
});
