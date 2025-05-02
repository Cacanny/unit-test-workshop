import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemListComponent } from './menu-item-list.component';
import { MenuItemModule } from './menu-item/menu-item.module';

@NgModule({
  declarations: [MenuItemListComponent],
  imports: [CommonModule, MenuItemModule],
  exports: [MenuItemListComponent],
})
export class MenuItemListModule {}
