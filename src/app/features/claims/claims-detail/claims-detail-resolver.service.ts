import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../../store/feature/insura-quest.feature';
import { InsuranceClaim } from '../../../store/insura-quest.types';

@Injectable({
  providedIn: 'root',
})
export class ClaimsDetailResolverService
  implements Resolve<InsuranceClaim | null>
{
  store = inject(Store);

  resolve(route: ActivatedRouteSnapshot): Observable<InsuranceClaim | null> {
    const claimId = route.paramMap.get('id');
    if (!claimId) {
      return of(null);
    }
    return this.store
      .select(insuraQuestFeature.selectInsuranceClaimById(+claimId))
      .pipe(take(1));
  }
}
