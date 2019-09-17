import { createActions } from 'redux-actions';

export const {
  fetchMovie,
  movieReceived,
  movieSearchResultReceived,
  setIsSearchFetching,
  setSearchValue,
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
  SET_SEARCH_VALUE: value => ({ value }),

  // Actions handled only by sagas

  /**
   * @param {string} id
   */
  FETCH_MOVIE: id => ({ id }),
});
