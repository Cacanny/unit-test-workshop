import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input() label = '';
  @Input() route = '';
}
