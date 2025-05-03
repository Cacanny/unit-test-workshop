import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FacadeService } from '../../store/facade.service';
import { MenuItem } from './menu-item/menu-item.types';

@Component({
  selector: 'app-menu-item-list',
  standalone: false,
  templateUrl: './menu-item-list.component.html',
})
export class MenuItemListComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  facade = inject(FacadeService);

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/dashboard/home' },
    { label: 'About', route: '/dashboard/about' },
  ];

  adminMenuItems: MenuItem[] = [
    { label: 'Creatures', route: '/dashboard/creatures' },
    { label: 'Claims', route: '/dashboard/claims' },
    { label: 'Progress', route: '/dashboard/progress' },
  ];

  userMenuItems: MenuItem[] = [
    { label: 'My claims', route: '/dashboard/claims' },
    { label: 'Submit Claim', route: '/dashboard/submit-claim' },
  ];

  ngOnInit() {
    this.facade.loggedInUserRole$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((role) => {
        this.menuItems = [
          ...this.menuItems,
          ...(role === 'admin' ? this.adminMenuItems : this.userMenuItems),
        ];
      });
  }
}
