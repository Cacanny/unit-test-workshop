/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { FacadeService } from '../../store/facade.service';
import { FraudRisk, InsuranceActionType } from '../../store/insura-quest.types';
import { mockInsuranceClaims } from '../api/api-insura-quest.mocks';
import { InsuranceClaimService } from './insurance-claim.service';

class MockFacadeService {
  alterInsuranceClaim = jasmine.createSpy();
}

describe('InsuranceClaimService', () => {
  let service: InsuranceClaimService;
  let facade: MockFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InsuranceClaimService,
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
      ],
    });

    service = TestBed.inject(InsuranceClaimService);
    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#alterClaimStatus', () => {
    it('should return true after a certain time', (done) => {
      service.alterClaimStatus().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('#submitClaim', () => {
    it('should return true after a certain time', (done) => {
      service.submitClaim().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('#alterInsuranceClaim', () => {
    it('should call the facade with some values', () => {
      service.alterInsuranceClaim(InsuranceActionType.APPROVED, 1, 'notice');

      expect(facade.alterInsuranceClaim).toHaveBeenCalledOnceWith(
        InsuranceActionType.APPROVED,
        1,
        'notice',
      );
    });
  });

  describe('#createClaim', () => {
    it('should return a new insurance claim', () => {
      const insuranceClaims = mockInsuranceClaims();

      const expectedInsuranceClaim: any = {
        id: 302,
        amountRequested: 5000,
        clientId: 101,
        description: 'description',
        title: 'New title',
        imageUrl: 'assets/image',
        status: InsuranceActionType.PENDING,
        fraudRisk: FraudRisk.LOW,
        claimProcessingHistory: [
          {
            claimId: 302,
            decision: InsuranceActionType.PENDING,
            notes: 'Initial creation of submit for clientId: 101',
            processedBy: 'Witch Alice',
          },
        ],
      };

      const result = service.createNewClaim(
        insuranceClaims as any,
        'assets/image',
        'Witch Alice',
        {
          clientId: 101,
          description: 'description',
          amount: 5000,
          title: 'New title',
        },
      );

      expect(result).toEqual(expectedInsuranceClaim);
    });
  });

  describe('#approveClaim', () => {
    it('should call the facade with some values', () => {
      service.approveClaim(1, 'notice');

      expect(facade.alterInsuranceClaim).toHaveBeenCalledOnceWith(
        InsuranceActionType.APPROVED,
        1,
        'notice',
      );
    });
  });

  describe('#rejectClaim', () => {
    it('should call the facade with some values', () => {
      service.rejectClaim(1, 'notice');

      expect(facade.alterInsuranceClaim).toHaveBeenCalledOnceWith(
        InsuranceActionType.REJECTED,
        1,
        'notice',
      );
    });
  });

  describe('#markAsFraud', () => {
    it('should call the facade with some values', () => {
      service.markAsFraud(1, 'notice');

      expect(facade.alterInsuranceClaim).toHaveBeenCalledOnceWith(
        InsuranceActionType.FLAG_FRAUD,
        1,
        'notice',
      );
    });
  });

  describe('#resolveFraud', () => {
    it('should call the facade with some values', () => {
      service.resolveFraud(1, 'notice');

      expect(facade.alterInsuranceClaim).toHaveBeenCalledOnceWith(
        InsuranceActionType.RESOLVE_FRAUD,
        1,
        'notice',
      );
    });
  });
});
