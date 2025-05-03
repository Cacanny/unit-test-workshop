/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponents } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../../store/facade.service';
import { MenuItemListComponent } from './menu-item-list.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItem } from './menu-item/menu-item.types';

class MockFacadeService {
  loggedInUserRole$ = new BehaviorSubject<string>('user');
}

describe('MenuItemListComponent', () => {
  let fixture: ComponentFixture<MenuItemListComponent>;
  let component: MenuItemListComponent;
  let facade: MockFacadeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemListComponent, MockComponents(MenuItemComponent)],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemListComponent);
    component = fixture.componentInstance;

    facade = TestBed.inject<MockFacadeService>(FacadeService as any);
  }));

  describe('roles and menu items', () => {
    const testCases: { role: string; expectedMenuItems: MenuItem[] }[] = [
      {
        role: 'user',
        expectedMenuItems: [
          { label: 'Home', route: '/dashboard/home' },
          { label: 'About', route: '/dashboard/about' },
          { label: 'My claims', route: '/dashboard/claims' },
          { label: 'Submit Claim', route: '/dashboard/submit-claim' },
        ],
      },
      {
        role: 'admin',
        expectedMenuItems: [
          { label: 'Home', route: '/dashboard/home' },
          { label: 'About', route: '/dashboard/about' },
          { label: 'Creatures', route: '/dashboard/creatures' },
          { label: 'Claims', route: '/dashboard/claims' },
          { label: 'Progress', route: '/dashboard/progress' },
        ],
      },
    ];

    testCases.forEach((testCase) => {
      it(`should return the excpected menu items for role ${testCase.role}`, () => {
        facade.loggedInUserRole$.next(testCase.role);

        fixture.detectChanges();

        expect(component.menuItems).toEqual(testCase.expectedMenuItems);
      });
    });
  });
});
