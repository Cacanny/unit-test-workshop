import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FraudRisk } from '../../../store/insura-quest.types';
import { FraudRiskBadgeDirective } from './fraud-risk-badge.directive';

@Component({
  template: `<div appFraudRiskBadge [fraudRisk]="fraudRisk"></div>`,
  standalone: false,
})
class TestComponent {
  fraudRisk!: FraudRisk;
}

describe('FraudRiskBadgeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: ElementRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FraudRiskBadgeDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.children[0];
  }));

  it('should apply the correct class for Low fraud risk', () => {
    fixture.componentInstance.fraudRisk = FraudRisk.LOW;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge bg-success');
    expect(element.nativeElement.textContent).toBe('Low');
  });

  it('should apply the correct class for Medium fraud risk', () => {
    fixture.componentInstance.fraudRisk = FraudRisk.MEDIUM;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge bg-warning');
    expect(element.nativeElement.textContent).toBe('Medium');
  });

  it('should apply the correct class for High fraud risk', () => {
    fixture.componentInstance.fraudRisk = FraudRisk.HIGH;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge bg-danger');
    expect(element.nativeElement.textContent).toBe('High');
  });

  it('should apply the default class for an unknown fraud risk', () => {
    fixture.componentInstance.fraudRisk = 'Unknown' as FraudRisk;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge bg-secondary');
    expect(element.nativeElement.textContent).toBe('Unknown');
  });
});
