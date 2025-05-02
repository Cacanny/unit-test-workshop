import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { InsuraQuestStoreModule } from './store/insura-quest-store.module';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storageSyncReducer } from './store/meta-reducers/storage.metareducer';

// add storageSyncReducer to metaReducers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metaReducers: MetaReducer<any>[] = [storageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NavigationModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, { metaReducers }),
    InsuraQuestStoreModule,
  ],
  providers: [provideHttpClient(), provideStoreDevtools()],
  bootstrap: [AppComponent],
})
export class AppModule {}
