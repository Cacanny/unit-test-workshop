/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockDirectives } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { StatusBadgeDirective } from '../../../shared/status/status.directive';
import { FacadeService } from '../../../store/facade.service';
import {
  createLoadingStatus,
  FraudRisk,
  LoadingState,
  LoadingStatusType,
} from '../../../store/insura-quest.types';
import {
  creatureMock,
  insuranceApprovedClaim,
  insuranceFlaggedFraudClaim,
  insurancePendingClaim,
} from '../../../testing-utils/testing.mocks';
import { CreatureComponent } from './creature.component';
import { FraudRiskBadgeDirective } from './fraud-risk-badge.directive';

class MockFacadeService {
  insuranceClaimsLoadingState$ = new BehaviorSubject<LoadingState>({
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    hasError: false,
  });
  insuranceClaimsByUserId$ = jasmine.createSpy().and.returnValue(of([]));
  creatureById$ = jasmine.createSpy().and.returnValue(of(creatureMock()));
  getInsuranceClaims = jasmine.createSpy();
}

describe('CreatureComponent', () => {
  let component: CreatureComponent;
  let fixture: ComponentFixture<CreatureComponent>;
  let facade: MockFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [
        CreatureComponent,
        MockDirectives(FraudRiskBadgeDirective, StatusBadgeDirective),
      ],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatureComponent);
    facade = TestBed.inject<MockFacadeService>(FacadeService as any);

    component = fixture.componentInstance;
  }));

  describe('when the id is known of the creature', () => {
    it('should call the facade and retrieve the creature with id 1', () => {
      fixture.detectChanges();

      expect(facade.creatureById$).toHaveBeenCalledWith(1);
    });
  });

  describe('when the insurances are not yet loaded ', () => {
    beforeEach(() => {
      facade.insuranceClaimsLoadingState$.next(
        createLoadingStatus(LoadingStatusType.IDLE),
      );

      fixture.detectChanges();
    });

    it('should call the facade and retrieve the insurance claims', () => {
      expect(facade.getInsuranceClaims).toHaveBeenCalled();
    });
  });

  describe('when the insurances are not yet loaded ', () => {
    beforeEach(() => {
      facade.insuranceClaimsLoadingState$.next(
        createLoadingStatus(LoadingStatusType.IDLE),
      );

      fixture.detectChanges();
    });

    it('should call the facade and retrieve the insurance claims', () => {
      expect(facade.getInsuranceClaims).toHaveBeenCalled();
    });
  });

  describe('when the insurances are equally filled', () => {
    beforeEach(() => {
      facade.insuranceClaimsByUserId$.and.returnValue(
        of([
          insurancePendingClaim(),
          insuranceApprovedClaim(),
          insuranceFlaggedFraudClaim(),
        ]),
      );
      fixture.detectChanges();
    });

    it('should fill the active, history and fraud insurance claims', () => {
      expect(component.activeInsuranceClaims.length).toBe(1);
      expect(component.historyInsuranceClaims.length).toBe(2);
      expect(component.fraudInsuranceClaims.length).toBe(1);
    });
  });

  // todo, fix the code!
  xdescribe('#determineHighestRisk', () => {
    beforeEach(() => {
      facade.insuranceClaimsByUserId$.and.returnValue(
        of([
          insurancePendingClaim(),
          insuranceApprovedClaim(),
          insuranceFlaggedFraudClaim(),
        ]),
      );
      fixture.detectChanges();
    });

    it('should fill the variable highest risk to be HIGH', () => {
      expect(component.highestRisk).toBe(FraudRisk.HIGH);
    });
  });
});
