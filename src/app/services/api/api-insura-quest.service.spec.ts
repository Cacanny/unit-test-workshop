/* eslint-disable @typescript-eslint/no-explicit-any */
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  mockClaimsProcessingHistory,
  mockCreatures,
  mockFraudeDetectionCases,
  mockInsuranceClaims,
  mockUsers,
} from './api-insura-quest.mocks';
import { InsuraQuestService } from './api-insura-quest.service';

describe('InsuraQuestService', () => {
  let service: InsuraQuestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InsuraQuestService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(InsuraQuestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should perform GET request and get a null user back', (done) => {
      const mockResponse = mockUsers();
      const url = 'http://localhost:3000/users';

      service.login('test@test.nl', '1234567').subscribe((response) => {
        expect(response).toEqual(null);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should perform GET request and get an user back', (done) => {
      const mockResponse = mockUsers();
      const url = 'http://localhost:3000/users';

      service.login('mage_milo', 'spellcaster123').subscribe((response) => {
        expect(response).toEqual({
          id: 1,
          username: 'mage_milo',
          role: 'claimsProcessor',
          password: 'spellcaster123',
        } as any);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', (done) => {
      const url = 'http://localhost:3000/users';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.login('test@test.nl', '1234567').subscribe((response) => {
        expect(response).toEqual(null);
        done();
      });

      const req = httpMock.expectOne(url);
      req.flush(null, mockError);
    });
  });

  describe('#getCreatures', () => {
    it('should perform GET request and get creatures back user back', (done) => {
      const mockResponse = mockCreatures();
      const url = 'http://localhost:3000/creatures';

      service.getCreatures().subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', (done) => {
      const url = 'http://localhost:3000/creatures';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getCreatures().subscribe((response) => {
        expect(response).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(url);
      req.flush(null, mockError);
    });
  });

  describe('#getInsuranceClaims (plural)', () => {
    it('should perform GET request and get insurance claims', (done) => {
      const mockResponse = mockInsuranceClaims();
      const url = 'http://localhost:3000/insuranceClaims';

      service.getInsuranceClaims().subscribe((response) => {
        expect(response).toEqual(mockResponse as any);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', (done) => {
      const url = 'http://localhost:3000/insuranceClaims';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getInsuranceClaims().subscribe((response) => {
        expect(response).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(url);
      req.flush(null, mockError);
    });
  });

  describe('#getInsuranceClaim (individual)', () => {
    it('should perform GET request and get individual insurance claim', (done) => {
      const mockResponse = mockInsuranceClaims()[0];
      const url = 'http://localhost:3000/insuranceClaims/1';

      service.getInsuranceClaim('1').subscribe((response) => {
        expect(response).toEqual(mockResponse as any);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', (done) => {
      const url = 'http://localhost:3000/insuranceClaims/1';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getInsuranceClaim('1').subscribe((response) => {
        expect(response).toEqual(null);
        done();
      });

      const req = httpMock.expectOne(url);
      req.flush(null, mockError);
    });
  });

  describe('#getFraudeDetectionCases', () => {
    it('should perform GET request and get fraud detection cases', (done) => {
      const mockResponse = mockFraudeDetectionCases();
      const url = 'http://localhost:3000/fraudDetectionCases';

      service.getFraudeDetectionCases().subscribe((response) => {
        expect(response).toEqual(mockResponse as any);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', (done) => {
      const url = 'http://localhost:3000/fraudDetectionCases';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getFraudeDetectionCases().subscribe((response) => {
        expect(response).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(url);
      req.flush(null, mockError);
    });
  });

  describe('#getClaimsProcessingHistory', () => {
    it('should perform GET request and get fraud detection cases', (done) => {
      const mockResponse = mockClaimsProcessingHistory();
      const url = 'http://localhost:3000/claimsProcessingHistory';

      service.getClaimsProcessingHistory().subscribe((response) => {
        expect(response).toEqual(mockResponse as any);
        done();
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error response', (done) => {
      const url = 'http://localhost:3000/claimsProcessingHistory';
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getClaimsProcessingHistory().subscribe((response) => {
        expect(response).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(url);
      req.flush(null, mockError);
    });
  });
});
