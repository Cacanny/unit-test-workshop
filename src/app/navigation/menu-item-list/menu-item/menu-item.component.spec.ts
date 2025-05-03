import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MockDirectives } from 'ng-mocks';
import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
  let fixture: ComponentFixture<MenuItemComponent>;
  let component: MenuItemComponent;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuItemComponent,
        MockDirectives(RouterLinkActive, RouterLink),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('when the label and route inputters are filled in', () => {
    beforeEach(() => {
      component.label = 'Label';
      component.route = '/test';

      fixture.detectChanges();
    });

    it('should generate a menu item with an anchor tag', () => {
      const anchorElement = element.querySelector('a');

      expect(anchorElement?.innerHTML).toContain('Label');
      expect(anchorElement?.getAttribute('ng-reflect-router-link')).toContain(
        '/test',
      );
    });
  });
});
