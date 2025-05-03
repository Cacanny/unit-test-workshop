import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { FacadeService } from '../../store/facade.service';
import { LoadingState } from '../../store/insura-quest.types';
import { CreatureListComponent } from './creature-list.component';

class MockFacadeService {
  creaturesLoadingState$ = new BehaviorSubject<LoadingState>({
    isIdle: false,
    isLoading: true,
    isSuccess: false,
    hasError: false,
  });
  creatures$ = new BehaviorSubject([]);
}

describe('CreatureListComponent', () => {
  let component: CreatureListComponent;
  let fixture: ComponentFixture<CreatureListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [CreatureListComponent, MockComponent(SpinnerComponent)],
      providers: [
        {
          provide: FacadeService,
          useClass: MockFacadeService,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatureListComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
