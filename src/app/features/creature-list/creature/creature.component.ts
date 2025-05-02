import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { insuraQuestFeature } from '../../../store/feature/insura-quest.feature';
import {
  Creature,
  FraudRisk,
  InsuranceActionType,
  InsuranceClaim,
} from '../../../store/insura-quest.types';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InsuraQuestActions } from '../../../store/actions/insura-quest.actions';

@Component({
  selector: 'app-creature',
  standalone: false,
  templateUrl: './creature.component.html',
})
export class CreatureComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  destroy$ = inject(DestroyRef);

  creature$!: Observable<Creature>;

  highestRisk!: FraudRisk;

  activeInsuranceClaims!: InsuranceClaim[];
  historyInsuranceClaims!: InsuranceClaim[];
  fraudInsuranceClaims!: InsuranceClaim[];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    this.creature$ = this.store.select(
      insuraQuestFeature.selectCreatureById(Number(idParam)),
    ) as Observable<Creature>;

    this.store
      .select(insuraQuestFeature.selectInsuranceClaimsLoadingState)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.store.dispatch(InsuraQuestActions.getInsuranceClaims());
        }
      });

    this.filterInsuranceClaims(Number(idParam));
  }

  filterInsuranceClaims(id: number) {
    this.store
      .select(insuraQuestFeature.selectInsuranceClaimsByUserId(Number(id)))
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((insuranceClaims) => {
        this.determineHighestFraudRisk(insuranceClaims);
        this.activeInsuranceClaims =
          this.filterActiveInsuranceClaims(insuranceClaims);
        this.historyInsuranceClaims =
          this.filterHistoryInsuranceClaims(insuranceClaims);
        this.fraudInsuranceClaims =
          this.filterInsuranceFraudCases(insuranceClaims);
      });
  }

  filterActiveInsuranceClaims(
    insuranceClaims: InsuranceClaim[],
  ): InsuranceClaim[] {
    return insuranceClaims.filter(
      (insuranceClaim) => insuranceClaim.status === InsuranceActionType.PENDING,
    );
  }

  filterHistoryInsuranceClaims(
    insuranceClaims: InsuranceClaim[],
  ): InsuranceClaim[] {
    return insuranceClaims.filter(
      (insuranceClaim) => insuranceClaim.status !== InsuranceActionType.PENDING,
    );
  }

  filterInsuranceFraudCases(
    insuranceClaims: InsuranceClaim[],
  ): InsuranceClaim[] {
    return insuranceClaims.filter(
      (insuranceClaim) =>
        insuranceClaim.status === InsuranceActionType.FLAG_FRAUD,
    );
  }

  determineHighestFraudRisk(insuranceClaims: InsuranceClaim[]) {
    const risks = Object.values(FraudRisk);
    this.highestRisk = insuranceClaims.reduce(
      (max, insuranceClaim) =>
        risks.includes(insuranceClaim.fraudRisk) &&
        insuranceClaim.fraudRisk > max
          ? insuranceClaim.fraudRisk
          : max,
      risks[0],
    );
  }
}
