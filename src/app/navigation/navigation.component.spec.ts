/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../store/facade.service';
import { User } from '../store/insura-quest.types';
import { userMock } from '../testing-utils/testing.mocks';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { MenuLogoComponent } from './menu-logo/menu-logo.component';
import { NavigationComponent } from './navigation.component';

class MockFacadeService {
  loggedInUser$ = new BehaviorSubject<User>(userMock());
  logOut = jasmine.createSpy();
}

class MockRouter {
  navigate = jasmine.createSpy();
}

describe('NavigationComponent', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;
  let facade: MockFacadeService;
  let router: MockRouter;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        MockComponents(MenuItemListComponent, MenuLogoComponent),
      ],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
    router = TestBed.inject<MockRouter>(Router as any);
  }));

  it('should behave...', () => {
    expect(component).toBeTruthy();
  });

  describe('#logOut', () => {
    it('when clicking on the logout button', () => {
      component.logOut();

      expect(facade.logOut).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/logout']);
    });
  });
});
