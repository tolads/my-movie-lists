import {
  call,
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import * as api from 'api/api';
import { addMovieToActiveList } from '../lists/actions';
import {
  fetchMovie,
  movieReceived,
  movieSearchResultReceived,
  setIsSearchFetching,
  setSearchValue,
} from './actions';
import { getMovies, getResultForMovieSearch } from './selectors';

function* searchMoviesSaga(action) {
  const trimmedKey = action.payload.value.trim();
  const result = getResultForMovieSearch(yield select(), { key: trimmedKey });

  if (trimmedKey.length < 3 || result) {
    yield put(setIsSearchFetching(false));
    return;
  }

  yield put(setIsSearchFetching(true));

  const { cancel } = yield race({
    cancel: take(action.type),
    timeout: delay(400),
  });

  if (cancel) {
    return;
  }

  try {
    const movies = yield call(api.searchMovies, trimmedKey);
    yield put(movieSearchResultReceived(trimmedKey, movies));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setIsSearchFetching(false));
  }
}

export function* watchSearchValue() {
  yield takeEvery(setSearchValue.toString(), searchMoviesSaga);
}

function* fetchMovieSaga(action) {
  const { id } = action.payload;
  yield put(addMovieToActiveList(id));

  if (getMovies(yield select())[id]) {
    return;
  }

  try {
    const movie = yield call(api.getMovie, id);
    yield put(movieReceived(movie));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchMovie() {
  yield takeEvery(fetchMovie.toString(), fetchMovieSaga);
}
