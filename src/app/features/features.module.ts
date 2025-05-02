import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { NavigationModule } from '../navigation/navigation.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    NavigationModule,
    FooterModule,
    FeaturesRoutingModule,
  ],
})
export class FeaturesModule {}
