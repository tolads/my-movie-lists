import * as api from 'api/api';
import { addMovieToActiveList } from '../lists/actions';
import { getMovies, getResultForMovieSearch } from './selectors';

export const MOVIE_RECEIVED = 'MOVIE_RECEIVED';
export const MOVIE_SEARCH_RESULT_RECEIVED = 'MOVIE_SEARCH_RESULT_RECEIVED';
export const SET_IS_SEARCH_FETCHING = 'SET_IS_SEARCH_FETCHING';
export const SET_SEARCH_VALUE_IN_STATE = 'SET_SEARCH_VALUE_IN_STATE';

/**
 * @param {boolean} isFetching
 */
const setIsSearchFetching = isFetching => ({
  type: SET_IS_SEARCH_FETCHING,
  payload: { isFetching },
});

/**
 * @param {string} key
 * @param {Object[]} movies
 */
export const movieSearchResultReceived = (key, movies) => ({
  type: MOVIE_SEARCH_RESULT_RECEIVED,
  payload: { key, movies },
});

/**
 * @param {Object} movie
 */
export const movieReceived = movie => ({
  type: MOVIE_RECEIVED,
  payload: { movie },
});

/**
 * @param {string} value
 */
const setSearchValueInState = value => ({
  type: SET_SEARCH_VALUE_IN_STATE,
  payload: { value },
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
