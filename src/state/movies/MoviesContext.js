import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import * as api from 'api/api';
import { ListsContext } from 'state/lists/ListsContext';
import {
  MOVIE_RECEIVED,
  MOVIE_SEARCH_RESULT_RECEIVED,
  SET_IS_SEARCH_FETCHING,
  SET_SEARCH_VALUE_IN_STATE,
} from './actionTypes';
import reducer, { defaultState } from './reducer';
import { getMovies, getResultForMovieSearch } from './selectors';

export const MoviesContext = createContext();

let movieSearch;

const MoviesProvider = ({ children }) => {
  const { addMovieToActiveList } = useContext(ListsContext);
  const [state, dispatch] = useReducer(reducer, defaultState);

  /**
   * @param {boolean} isFetching
   */
  const setIsSearchFetching = isFetching =>
    dispatch({
      type: SET_IS_SEARCH_FETCHING,
      payload: { isFetching },
    });

  /**
   * @param {string} key
   * @param {Object[]} result
   */
  const movieSearchResultReceived = (key, movies) =>
    dispatch({
      type: MOVIE_SEARCH_RESULT_RECEIVED,
      payload: { key, movies },
    });

  /**
   * @param {Object} movie
   */
  const movieReceived = movie =>
    dispatch({
      type: MOVIE_RECEIVED,
      payload: { movie },
    });

  /**
   * @param {string} value
   */
  const setSearchValueInState = value =>
    dispatch({
      type: SET_SEARCH_VALUE_IN_STATE,
      payload: { value },
    });

  /**
   * @param {string} key
   */
  const searchMovies = key => {
    const trimmedKey = key.trim();
    const result = getResultForMovieSearch(state, { key: trimmedKey });

    if (trimmedKey.length < 3 || result) {
      setIsSearchFetching(false);
      return;
    }

    setIsSearchFetching(true);

    window.clearTimeout(movieSearch);
    movieSearch = window.setTimeout(() => {
      api
        .searchMovies(trimmedKey)
        .then(movies => {
          movieSearchResultReceived(trimmedKey, movies);
        })
        .catch(console.error)
        .finally(() => {
          setIsSearchFetching(false);
        });
    }, 400);
  };

  /**
   * @param {string} value
   */
  const setSearchValue = value => {
    setSearchValueInState(value);
    searchMovies(value);
  };

  /**
   * @param {string} id
   */
  const fetchMovie = id => {
    addMovieToActiveList(id);

    if (getMovies(state)[id]) {
      return;
    }

    api
      .getMovie(id)
      .then(movie => {
        movieReceived(movie);
      })
      .catch(console.error);
  };

  return (
    <MoviesContext.Provider
      value={{
        state,
        fetchMovie,
        setSearchValue,
        movieReceived,
        movieSearchResultReceived,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MoviesProvider;
