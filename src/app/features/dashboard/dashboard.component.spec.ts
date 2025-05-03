/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';

class MockFacadeService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
}

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let facade: MockFacadeService;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponents(AdminDashboardComponent, PublicDashboardComponent),
      ],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    element = fixture.nativeElement;

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
  }));

  describe('when the user is logged in', () => {
    beforeEach(() => {
      facade.isLoggedIn$.next(true);
      fixture.detectChanges();
    });

    it('should render the admin dashboard', () => {
      const dashboardElement = element.querySelector('app-admin-dashboard');

      expect(dashboardElement).toBeTruthy();
    });
  });

  describe('when the user is NOT logged in', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render the public dashboard', () => {
      const dashboardElement = element.querySelector('app-public-dashboard');

      expect(dashboardElement).toBeTruthy();
    });
  });
});
