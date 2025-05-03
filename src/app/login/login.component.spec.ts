/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../store/facade.service';
import { LoginComponent } from './login.component';

class MockFacadeService {
  isLoggedIn$ = new BehaviorSubject(false);
  login = jasmine.createSpy();
}

class MockRouter {
  navigate = jasmine.createSpy();
}

class MockActivatedRoute {
  snapshot = {
    queryParamMap: convertToParamMap({}), // Mocked query param
  };
}

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let facade: MockFacadeService;
  let router: MockRouter;
  let activatedRoute: MockActivatedRoute;
  let originalUrl: string;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
    router = TestBed.inject<MockRouter>(Router as any);
    activatedRoute = TestBed.inject<MockActivatedRoute>(ActivatedRoute as any);
    component = fixture.componentInstance;

    originalUrl = window.location.href;
    fixture.detectChanges();
  }));

  afterEach(() => {
    window.history.pushState({}, '', originalUrl); // Restore original state
  });

  describe('when the formValues are valid ', () => {
    describe('#onSubmit when the login is submitted', () => {
      it('should call the facade login function', () => {
        const expectedResult = ['admin_alice@insuraquest.com', 'adminpass789'];

        component.onSubmit();

        expect(facade.login).toHaveBeenCalledWith(...expectedResult);
      });
    });
  });

  describe('when the formValues are invalid and form is submitted', () => {
    it('should not call  the facade login function', () => {
      component.loginForm.setValue({
        email: '',
        password: '',
      });

      component.onSubmit();

      expect(facade.login).not.toHaveBeenCalled();
    });
  });

  describe('when the logged in status is true', () => {
    describe('and the return Url exists', () => {
      beforeEach(() => {
        activatedRoute.snapshot = {
          queryParamMap: convertToParamMap({ returnUrl: 'test' }),
        };
        facade.isLoggedIn$.next(true);
      });

      it('should navigate to the return Url (if it ex) the component', () => {
        const expectedResult = { replaceUrl: true };

        expect(router.navigate).toHaveBeenCalledWith(['test'], expectedResult);
      });
    });

    describe('and the return Url does not exists', () => {
      beforeEach(() => {
        facade.isLoggedIn$.next(true);
      });

      it('should navigate to dashboard/home', () => {
        const expectedResult = { replaceUrl: true };

        expect(router.navigate).toHaveBeenCalledWith(
          ['dashboard/home'],
          expectedResult,
        );
      });
    });
  });
});
