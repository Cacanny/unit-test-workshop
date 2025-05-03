import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FacadeService } from '../../../store/facade.service';
import {
  Creature,
  FraudRisk,
  InsuranceActionType,
  InsuranceClaim,
} from '../../../store/insura-quest.types';

@Component({
  selector: 'app-creature',
  standalone: false,
  templateUrl: './creature.component.html',
})
export class CreatureComponent implements OnInit {
  facade = inject(FacadeService);
  route = inject(ActivatedRoute);
  destroy$ = inject(DestroyRef);

  creature$!: Observable<Creature>;

  highestRisk!: FraudRisk;

  activeInsuranceClaims!: InsuranceClaim[];
  historyInsuranceClaims!: InsuranceClaim[];
  fraudInsuranceClaims!: InsuranceClaim[];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    this.creature$ = this.facade.creatureById$(
      Number(idParam),
    ) as Observable<Creature>;

    this.facade.insuranceClaimsLoadingState$
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((status) => {
        if (status.isIdle) {
          this.facade.getInsuranceClaims();
        }
      });

    this.filterInsuranceClaims(Number(idParam));
  }

  filterInsuranceClaims(id: number) {
    this.facade
      .insuranceClaimsByUserId$(id)
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
