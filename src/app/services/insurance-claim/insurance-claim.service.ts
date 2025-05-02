import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceClaimService {
  alterClaimStatus(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }
}
