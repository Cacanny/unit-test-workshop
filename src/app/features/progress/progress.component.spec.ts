/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockDirective } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { StatusBadgeDirective } from '../../shared/status/status.directive';
import { FacadeService } from '../../store/facade.service';
import {
  insurancePendingClaim,
  userMock,
} from '../../testing-utils/testing.mocks';
import { ProgressComponent } from './progress.component';

class MockFacadeService {
  insuranceDetailClaimsByUserIdAndUser$ = new BehaviorSubject({
    user: userMock(),
    insuranceClaim: [insurancePendingClaim()],
  });
}

describe('ProgressComponent', () => {
  let fixture: ComponentFixture<ProgressComponent>;
  let component: ProgressComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressComponent, MockDirective(StatusBadgeDirective)],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
