import { storageSync } from '@larscom/ngrx-store-storagesync';
import { ActionReducer } from '@ngrx/store';
import { InsuraQuestState } from '../feature/insura-quest.feature';

export function storageSyncReducer(
  reducer: ActionReducer<InsuraQuestState>,
): ActionReducer<InsuraQuestState> {
  // provide all feature states within the features array
  // features which are not provided, do not get synced
  const metaReducer = storageSync<InsuraQuestState>({
    features: [{ stateKey: 'insuraQuest' }],
    // defaults to localStorage
    storage: window.sessionStorage,
  });

  return metaReducer(reducer);
}
