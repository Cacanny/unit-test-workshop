import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { insuraQuestFeature } from './feature/insura-quest.feature';
import { InsuraQuestEffects } from './effects/insura-quest.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(insuraQuestFeature),
    EffectsModule.forFeature([InsuraQuestEffects]),
  ],
})
export class InsuraQuestStoreModule {}
