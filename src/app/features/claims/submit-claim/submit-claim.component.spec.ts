/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { FacadeService } from '../../../store/facade.service';
import {
  createLoadingStatus,
  Creature,
  LoadingState,
  LoadingStatusType,
} from '../../../store/insura-quest.types';
import { creatureMock } from '../../../testing-utils/testing.mocks';
import { SubmitClaimComponent } from './submit-claim.component';

class MockFacadeService {
  creatures$ = new BehaviorSubject<Creature[]>([]);
  submitClaimStatus$ = new BehaviorSubject<LoadingState>({
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    hasError: false,
  });
  submitClaim = jasmine.createSpy();
}

describe('SubmitClaimComponent', () => {
  let component: SubmitClaimComponent;
  let fixture: ComponentFixture<SubmitClaimComponent>;
  let facade: MockFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitClaimComponent, MockComponent(SpinnerComponent)],
      imports: [ReactiveFormsModule],
      providers: [{ provide: FacadeService, useClass: MockFacadeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitClaimComponent);

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);

    component = fixture.componentInstance;
  }));

  describe('when the creatures list is not empty', () => {
    beforeEach(() => {
      facade.creatures$.next([creatureMock()]);
      fixture.detectChanges();
    });

    it('should fill the options ', () => {
      const expectedValue = 101;

      expect(component.options[0].value).toBe(expectedValue);
    });
  });

  describe('when the loadingStatus has isSuccess', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should reset the form values', () => {
      const formValues = {
        creature: 101,
        title: 'title',
        description: 'description',
        amount: 100,
      };

      const expectedFormValues = {
        creature: null,
        title: null,
        description: null,
        amount: null,
      };

      component.claimForm.setValue(formValues);

      expect(component.claimForm.value).toEqual(formValues);

      facade.submitClaimStatus$.next(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );

      expect(component.claimForm.value).toEqual(expectedFormValues);
    });

    it('should show an alert', () => {
      facade.submitClaimStatus$.next(
        createLoadingStatus(LoadingStatusType.SUCCESS),
      );

      fixture.detectChanges();

      const componentElement: HTMLElement = fixture.nativeElement;

      expect(componentElement.querySelector('div.alert')?.innerHTML).toContain(
        'Succesfully submitted a claim',
      );
    });
  });

  describe('#onSubmit', () => {
    describe('when the form is valid', () => {
      beforeEach(() => {
        const formValues = {
          creature: 101,
          title: 'title',
          description: 'description',
          amount: 100,
        };

        component.claimForm.setValue(formValues);

        fixture.detectChanges();
      });

      it('should call the facade submit claim action', () => {
        const expectedCall = {
          creature: 101,
          title: 'title',
          description: 'description',
          amount: 100,
        };

        component.onSubmit();

        expect(facade.submitClaim).toHaveBeenCalledWith(expectedCall);
      });
    });
  });
});
