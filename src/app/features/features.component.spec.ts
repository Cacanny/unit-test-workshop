import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { NavigationComponent } from '../navigation/navigation.component';
import { FeaturesComponent } from './features.component';
import { FooterComponent } from './footer/footer.component';

describe('FeaturesComponent', () => {
  let fixture: ComponentFixture<FeaturesComponent>;
  let component: FeaturesComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [
        FeaturesComponent,
        MockComponents(NavigationComponent, FooterComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
