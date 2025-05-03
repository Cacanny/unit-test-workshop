/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { FacadeService } from '../../../store/facade.service';
import {
  createLoadingStatus,
  LoadingStatusType,
} from '../../../store/insura-quest.types';
import { AdminDashboardComponent } from './admin-dashboard.component';

class MockFacadeService {
  insuranceClaimsLoadingState$ = new BehaviorSubject(
    createLoadingStatus(LoadingStatusType.IDLE),
  );
  fraudDetectionCasesLoadingState$ = new BehaviorSubject(
    createLoadingStatus(LoadingStatusType.IDLE),
  );
  loggedInUser$ = new BehaviorSubject(null);
  pendingClaims$ = new BehaviorSubject([]);
  fraudDetectionCases$ = new BehaviorSubject([]);
  getInsuranceClaims = jasmine.createSpy();
  getFraudDetectionCases = jasmine.createSpy();
}

describe('AdminDashboardComponent', () => {
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let facade: MockFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent, MockComponents(SpinnerComponent)],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
    fixture.detectChanges();
  }));

  describe('when insurances are not yet loaded', () => {
    it('should call the getInsuranceClaims', () => {
      expect(facade.getInsuranceClaims).toHaveBeenCalled();
    });
  });

  describe('when fraud detection cases are not yet loaded', () => {
    it('should call the fraudDetectionCases', () => {
      expect(facade.getFraudDetectionCases).toHaveBeenCalled();
    });
  });
});
