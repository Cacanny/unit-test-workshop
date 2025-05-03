import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InsuranceActionType } from '../../store/insura-quest.types';
import { StatusBadgeDirective } from './status.directive';

@Component({
  template: `<div appStatusBadge [status]="status"></div>`,
  standalone: false,
})
class TestComponent {
  status!: InsuranceActionType;
}

describe('StatusBadgeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: ElementRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, StatusBadgeDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.children[0];
  }));

  it('should apply the correct class for Pending status', () => {
    component.status = 'Pending' as InsuranceActionType;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge text-bg-secondary');
    expect(element.nativeElement.textContent).toBe('Pending');
  });

  it('should apply the correct class for Approved status', () => {
    component.status = 'Approved' as InsuranceActionType;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge text-bg-success');
    expect(element.nativeElement.textContent).toBe('Approved');
  });

  it('should apply the correct class for FlagFraud status', () => {
    component.status = 'FlagFraud' as InsuranceActionType;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge text-bg-warning');
    expect(element.nativeElement.textContent).toBe('Flagged for Fraud');
  });

  it('should apply the correct class for Rejected status', () => {
    component.status = 'Rejected' as InsuranceActionType;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge text-bg-danger');
    expect(element.nativeElement.textContent).toBe('Rejected');
  });

  it('should apply the correct class for ResolveFraud status', () => {
    component.status = 'ResolveFraud' as InsuranceActionType;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge text-bg-info');
    expect(element.nativeElement.textContent).toBe('Fraud Resolved');
  });

  it('should apply the default class for an invalid status', () => {
    component.status = 'InvalidStatus' as InsuranceActionType;
    fixture.detectChanges();

    expect(element.nativeElement.className).toBe('badge bg-secondary');
    expect(element.nativeElement.textContent).toBe('Unknown');
  });
});
