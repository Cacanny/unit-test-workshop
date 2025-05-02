import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { FraudRisk } from '../../../store/insura-quest.types';

@Directive({
  standalone: false,
  selector: '[appFraudRiskBadge]',
})
export class FraudRiskBadgeDirective implements OnChanges {
  @Input() fraudRisk!: FraudRisk;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    this.updateBadgeClass();
  }

  private updateBadgeClass(): void {
    const riskClasses: Record<string, string> = {
      Low: 'badge bg-success', // Green badge for low risk
      Medium: 'badge bg-warning', // Yellow badge for medium risk
      High: 'badge bg-danger', // Red badge for high risk
    };

    // Apply class dynamically
    this.renderer.setAttribute(
      this.el.nativeElement,
      'class',
      riskClasses[this.fraudRisk] || 'badge bg-secondary',
    );

    // Set the text content to display the fraud risk level
    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      this.fraudRisk,
    );
  }
}
