/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { InsuraQuestActions } from './actions/insura-quest.actions';
import { FacadeService } from './facade.service';
import { InsuranceActionType } from './insura-quest.types';

describe('FacadeService', () => {
  let service: FacadeService;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    TestBed.configureTestingModule({
      providers: [FacadeService, { provide: Store, useValue: storeSpy }],
    });
  });

  afterEach(() => {
    storeSpy.select.calls.reset();
  });

  describe('Selectors', () => {
    it('should select isLoggedIn$', (done) => {
      storeSpy.select.and.returnValue(of(true));
      service = TestBed.inject(FacadeService);
      service.isLoggedIn$.subscribe((val) => {
        expect(val).toBe(true);
        done();
      });
      expect(storeSpy.select).toHaveBeenCalled();
    });

    it('should select loggedInUser$', (done) => {
      storeSpy.select.and.returnValue(of({ id: 1, name: 'Test' }));
      service = TestBed.inject(FacadeService);
      service.loggedInUser$.subscribe((val) => {
        expect(val).toEqual({ id: 1, name: 'Test' } as any);
        done();
      });
      expect(storeSpy.select).toHaveBeenCalled();
    });

    it('should select insuranceClaimById$', (done) => {
      storeSpy.select.and.returnValue(of({ id: 2 }));
      service = TestBed.inject(FacadeService);
      service.insuranceClaimById$(2).subscribe((val) => {
        expect(val).toEqual({ id: 2 } as any);
        done();
      });
      expect(storeSpy.select).toHaveBeenCalled();
    });

    it('should select creatureById$', (done) => {
      storeSpy.select.and.returnValue(of({ id: 3 }));
      service = TestBed.inject(FacadeService);
      service.creatureById$(3).subscribe((val) => {
        expect(val).toEqual({ id: 3 } as any);
        done();
      });
      expect(storeSpy.select).toHaveBeenCalled();
    });

    it('should select insuranceClaimsByUserId$', (done) => {
      storeSpy.select.and.returnValue(of([{ id: 4 }]));
      service = TestBed.inject(FacadeService);
      service.insuranceClaimsByUserId$(4).subscribe((val) => {
        expect(val).toEqual([{ id: 4 } as any]);
        done();
      });
      expect(storeSpy.select).toHaveBeenCalled();
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      service = TestBed.inject(FacadeService);
    });

    it('should dispatch login action', () => {
      service.login('user', 'pass');
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.login({ username: 'user', password: 'pass' }),
      );
    });

    it('should dispatch logOut action', () => {
      service.logOut();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.logOut(),
      );
    });

    it('should dispatch getCreatures action', () => {
      service.getCreatures();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.getCreatures(),
      );
    });

    it('should dispatch getInsuranceClaims action', () => {
      service.getInsuranceClaims();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.getInsuranceClaims(),
      );
    });

    it('should dispatch submitClaim action', () => {
      const claim = { id: 1, data: 'test' } as any;
      service.submitClaim(claim);
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.submitClaim({ claim }),
      );
    });

    it('should dispatch getFraudDetectionCases action', () => {
      service.getFraudDetectionCases();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.getFraudDetectionCases(),
      );
    });

    it('should dispatch alterInsuranceClaim action', () => {
      service.alterInsuranceClaim(InsuranceActionType.APPROVED, 5, 'notice');
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        InsuraQuestActions.alterInsuranceClaim({
          status: InsuranceActionType.APPROVED,
          claimId: 5,
          notice: 'notice',
        }),
      );
    });
  });
});
