import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { MenuLogoModule } from './menu-logo/menu-logo.module';
import { MenuItemListModule } from './menu-item-list/menu-item-list.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, MenuLogoModule, MenuItemListModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
