import { Component, inject } from '@angular/core';
import { FacadeService } from '../../store/facade.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  facade = inject(FacadeService);

  isLoggedIn$ = this.facade.isLoggedIn$;
}
