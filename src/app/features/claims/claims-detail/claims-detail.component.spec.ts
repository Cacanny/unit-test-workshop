/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClaimsDetailComponent } from './claims-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InsuranceClaimService } from '../../../services/insurance-claim/insurance-claim.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  createLoadingStatus,
  FraudRisk,
  InsuranceActionType,
  LoadingStatusType,
} from '../../../store/insura-quest.types';
import { insuraQuestFeature } from '../../../store/feature/insura-quest.feature';
import { MockSpinnerComponent } from '../../../shared/spinner/testing/spinner.mock';

class MockInsuranceClaimService {
  approveClaim = jasmine.createSpy();
  rejectClaim = jasmine.createSpy();
  resolveFraud = jasmine.createSpy();
  markAsFraud = jasmine.createSpy();
}

describe('ClaimsDetailComponent', () => {
  let component: ClaimsDetailComponent;
  let fixture: ComponentFixture<ClaimsDetailComponent>;
  let mockStore: MockStore;
  let mockActivatedRoute: any;
  let mockInsuranceClaimService: MockInsuranceClaimService;

  const insuranceClaim = {
    id: 301,
    clientId: 101,
    title: "🔥 Dragon's Hoard Fire Disaster",
    description: 'Accidentally burned down gold stash with fire breath.',
    amountRequested: 5000,
    status: InsuranceActionType.PENDING,
    fraudRisk: FraudRisk.HIGH,
    imageUrl: 'assets/dragon.png',
  };

  beforeEach(waitForAsync(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('1'),
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [ClaimsDetailComponent, MockSpinnerComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: InsuranceClaimService, useClass: MockInsuranceClaimService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimsDetailComponent);
    mockInsuranceClaimService = TestBed.inject<MockInsuranceClaimService>(
      InsuranceClaimService as any,
    );

    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(
      'selectAlterInsuranceClaimStatus',
      createLoadingStatus(LoadingStatusType.IDLE),
    );

    mockStore.overrideSelector(
      insuraQuestFeature.selectClaimsProcessionHistoryLoadingStatus,
      createLoadingStatus(LoadingStatusType.IDLE),
    );

    mockStore.overrideSelector(
      'selectAlterInsuranceClaimStatus',
      createLoadingStatus(LoadingStatusType.IDLE),
    );

    mockStore.overrideSelector(
      insuraQuestFeature.selectInsuranceClaimById(301),
      {
        id: 301,
        clientId: 101,
        title: "🔥 Dragon's Hoard Fire Disaster",
        description: 'Accidentally burned down gold stash with fire breath.',
        amountRequested: 5000,
        status: InsuranceActionType.PENDING,
        fraudRisk: FraudRisk.HIGH,
        imageUrl: 'assets/dragon.png',
      },
    );

    mockStore.overrideSelector(insuraQuestFeature.selectInsuranceClaims, [
      insuranceClaim,
    ]);

    mockStore.overrideSelector(
      insuraQuestFeature.selectInsuranceClaimById(301),
      insuranceClaim,
    );

    mockStore.refreshState();

    mockInsuranceClaimService = TestBed.inject<MockInsuranceClaimService>(
      InsuranceClaimService as any,
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize claimId from route params', () => {
    expect(component.claimId).toBe(1);
  });

  describe('#approveClaim', () => {
    describe('when the form values are valid', () => {
      it('should call service to approve the claim', () => {
        component.formGroup.setValue({
          notice: 'something is filled',
        });

        component.approveClaim();

        expect(mockInsuranceClaimService.approveClaim).toHaveBeenCalledWith(
          1,
          'something is filled',
        );
      });
    });

    describe('when the form values are NOT filled', () => {
      it('should call NOT service to approve the claim', () => {
        component.approveClaim();

        expect(mockInsuranceClaimService.approveClaim).not.toHaveBeenCalled();
      });
    });
  });

  describe('#rejectClaim', () => {
    it('should call service to approve the claim', () => {
      component.formGroup.setValue({
        notice: 'something is filled',
      });

      component.rejectClaim();

      expect(mockInsuranceClaimService.rejectClaim).toHaveBeenCalledWith(
        1,
        'something is filled',
      );
    });
  });

  describe('#resolveFraud', () => {
    it('should call service to approve the claim', () => {
      component.formGroup.setValue({
        notice: 'something is filled',
      });

      component.resolveFraud();

      expect(mockInsuranceClaimService.resolveFraud).toHaveBeenCalledWith(
        1,
        'something is filled',
      );
    });
  });

  describe('#markAsFraud', () => {
    it('should call service to approve the claim', () => {
      component.formGroup.setValue({
        notice: 'something is filled',
      });

      component.markAsFraud();

      expect(mockInsuranceClaimService.markAsFraud).toHaveBeenCalledWith(
        1,
        'something is filled',
      );
    });
  });
});
