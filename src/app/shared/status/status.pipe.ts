import { Pipe, PipeTransform } from '@angular/core';
import { InsuranceActionType } from '../../store/insura-quest.types';

@Pipe({
  name: 'insuranceStatusDescription',
  standalone: false,
})
export class InsuranceStatusDescriptionPipe implements PipeTransform {
  transform(insuranceStatusType: InsuranceActionType | undefined): string {
    switch (insuranceStatusType) {
      case InsuranceActionType.PENDING:
        return 'Pending';
      case InsuranceActionType.REJECTED:
        return 'Rejected';
      case InsuranceActionType.RESOLVE_FRAUD:
        return 'Fraud Resolved';
      case InsuranceActionType.APPROVED:
        return 'Approved';
      case InsuranceActionType.FLAG_FRAUD:
        return 'Flagged for Fraud';
      default:
        return 'Unknown';
    }
  }
}
