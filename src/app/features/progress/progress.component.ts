import { Component, inject } from '@angular/core';
import { FacadeService } from '../../store/facade.service';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
})
export class ProgressComponent {
  facade = inject(FacadeService);

  selectInsuranceDetailClaimsByUserIdAndUser$ =
    this.facade.insuranceDetailClaimsByUserIdAndUser$;
}
