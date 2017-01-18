import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import {
  RECEIVED_MATCHING_CONTEXTS,
  UPDATE_DRAFT_RECOMMENDATIONS,
  UNINSTALL,
  INSTALLED
} from '../constants/ActionTypes';

const initialNotPrefs = {
  onInstalledDetails: new ImmutableMap(),
  matchingContexts: new ImmutableSet(),
  draftRecommendations: new ImmutableSet(),
};

export default function (state = initialNotPrefs, action) {
  const { type } = action;

  console.log('reducer', type, action);

  // FIXME: background state should be Immutable
  switch (type) {
    case RECEIVED_MATCHING_CONTEXTS:
      const { matchingContexts } = action;
      return state.set('matchingContexts', matchingContexts);

    case UPDATE_DRAFT_RECOMMENDATIONS: {
      const { draftRecommendations } = action;

      return state.set('draftRecommendations', draftRecommendations);
    }

    case UNINSTALL: {
      console.warn('Extension uninstallation is disabled when environment is development.');
      if (process.env.NODE_ENV !== 'development') {
        // Delay uninstallation to make sure tracking is done
        setTimeout(() => chrome.management.uninstallSelf(), 1000);
      }
      return state;
    }

    case INSTALLED: {
      const { onInstalledDetails } = action;
      return state.set('onInstalledDetails', onInstalledDetails);
    }

    default:
      return state;
  }
}

