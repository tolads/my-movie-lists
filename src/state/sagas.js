import { all } from 'redux-saga/effects';

import { watchFetchMovie, watchSearchValue } from './movies/sagas';

export default function* rootSaga() {
  yield all([watchSearchValue(), watchFetchMovie()]);
}
