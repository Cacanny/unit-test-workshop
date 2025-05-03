/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import {
  createLoadingStatus,
  LoadingState,
  LoadingStatusType,
} from '../../store/insura-quest.types';
import { InsuranceClaimDetail } from './claims-detail.types';
import { ClaimsComponent } from './claims.component';

class MockFacadeService {
  creaturesLoadingState$ = new BehaviorSubject<LoadingState>({
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    hasError: false,
  });
  insuranceClaimsLoadingState$ = new BehaviorSubject<LoadingState>({
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    hasError: false,
  });
  insuranceDetailClaims$ = new BehaviorSubject<InsuranceClaimDetail[]>([]);
  getCreatures = jasmine.createSpy();
  getInsuranceClaims = jasmine.createSpy();
}

describe('ClaimsComponent', () => {
  let fixture: ComponentFixture<ClaimsComponent>;
  let facade: MockFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsComponent],
      providers: [{ provide: FacadeService, useClass: MockFacadeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimsComponent);

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
  }));

  describe('when the insurances are not yet loaded ', () => {
    beforeEach(() => {
      facade.insuranceClaimsLoadingState$.next(
        createLoadingStatus(LoadingStatusType.IDLE),
      );
      fixture.detectChanges();
    });

    it('should call the service to load the insurances', () => {
      expect(facade.getInsuranceClaims).toHaveBeenCalled();
    });
  });

  describe('when the creatures are not yet loaded ', () => {
    beforeEach(() => {
      facade.creaturesLoadingState$.next(
        createLoadingStatus(LoadingStatusType.IDLE),
      );
      fixture.detectChanges();
    });

    it('should call the service to load the creatures', () => {
      expect(facade.getCreatures).toHaveBeenCalled();
    });
  });
});
