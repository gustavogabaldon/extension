import { put } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { refreshContributors } from 'app/actions';
import { fetchContributorNotices } from '../actions/notices';
import { fetchContributorRequest } from 'app/actions/contributor';
import takeLatestLocationChange from 'app/store/sagas/effects/takeLatestLocationChange';
import en from 'i18n/resources/en/extension.json';
import fr from 'i18n/resources/fr/extension.json';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id)));
  yield put(fetchContributorNotices(Number(match.params.id)));
  yield put(refreshContributors());
}

export default function* locationChangeSaga() {
  yield takeLatestLocationChange(
    [en.path.profiles.contributors, fr.path.profiles.contributors],
    contributorsLocationSaga
  );

  yield takeLatestLocationChange(
    [en.path.profiles.subscriptions, fr.path.profiles.subscriptions],
    contributorsLocationSaga
  );

  yield takeLatestLocationChange<{ id: string }>(
    [
      en.path.profiles.contributors + '/:id/:slug',
      fr.path.profiles.contributors + '/:id/:slug'
    ],
    contributorLocationSaga
  );
}
