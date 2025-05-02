import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { InsuranceActionType } from '../../store/insura-quest.types';
import { InsuranceStatusDescriptionPipe } from './status.pipe';

@Directive({
  standalone: false,
  selector: '[appStatusBadge]',
})
export class StatusBadgeDirective implements OnChanges {
  @Input() status!: InsuranceActionType;

  pipe = new InsuranceStatusDescriptionPipe();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    this.updateBadgeClass();
  }

  private updateBadgeClass(): void {
    const statusList: Record<InsuranceActionType, string> = {
      Pending: 'badge text-bg-secondary', // Green badge for low risk
      Approved: 'badge text-bg-success', // Yellow badge for medium risk
      FlagFraud: 'badge text-bg-warning', // Red badge for high risk
      Rejected: 'badge text-bg-danger', // Red badge for high risk
      ResolveFraud: 'badge text-bg-info', // Red badge for high risk
    };

    // Apply class dynamically
    this.renderer.setAttribute(
      this.el.nativeElement,
      'class',
      statusList[this.status] || 'badge bg-secondary',
    );

    // Set the text content to display the fraud risk level
    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      this.pipe.transform(this.status),
    );
  }
}
