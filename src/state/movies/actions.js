import { createActions } from 'redux-actions';

import * as api from 'api/api';
import { addMovieToActiveList } from '../lists/actions';
import { getMovies, getResultForMovieSearch } from './selectors';

export const {
  movieReceived,
  movieSearchResultReceived,
  setIsSearchFetching,
  setSearchValueInState,
} = createActions({
  /**
   * @param {boolean} isFetching
   */
  SET_IS_SEARCH_FETCHING: isFetching => ({ isFetching }),

  /**
   * @param {string} key
   * @param {Object[]} result
   */
  MOVIE_SEARCH_RESULT_RECEIVED: (key, movies) => ({ key, movies }),

  /**
   * @param {Object} movie
   */
  MOVIE_RECEIVED: movie => ({ movie }),

  /**
   * @param {string} value
   */
  SET_SEARCH_VALUE_IN_STATE: value => ({ value }),
});

let movieSearch;

/**
 * @param {string} key
 */
const searchMovies = key => (dispatch, getState) => {
  const trimmedKey = key.trim();
  const result = getResultForMovieSearch(getState(), { key: trimmedKey });

  if (trimmedKey.length < 3 || result) {
    dispatch(setIsSearchFetching(false));
    return;
  }

  dispatch(setIsSearchFetching(true));

  window.clearTimeout(movieSearch);
  movieSearch = window.setTimeout(() => {
    api
      .searchMovies(trimmedKey)
      .then(movies => {
        dispatch(movieSearchResultReceived(trimmedKey, movies));
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setIsSearchFetching(false));
      });
  }, 400);
};

/**
 * @param {string} value
 */
export const setSearchValue = value => dispatch => {
  dispatch(setSearchValueInState(value));
  dispatch(searchMovies(value));
};

/**
 * @param {string} id
 */
export const fetchMovie = id => (dispatch, getState) => {
  dispatch(addMovieToActiveList(id));

  if (getMovies(getState())[id]) {
    return;
  }

  api
    .getMovie(id)
    .then(movie => {
      dispatch(movieReceived(movie));
    })
    .catch(console.error);
};
