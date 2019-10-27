import React, { createContext, useContext } from 'react';
import { useService } from '@xstate/react';
import PropTypes from 'prop-types';

import { ListsContext } from 'state/lists/ListsContext';
import { FETCH_MOVIE, SET_SEARCH_VALUE } from './eventTypes';

export const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const {
    current: {
      context: { movies },
    },
  } = useContext(ListsContext);
  const [current, send] = useService(movies);

  /**
   * @param {string} value
   */
  const setSearchValue = value => send(SET_SEARCH_VALUE, { value });

  /**
   * @param {string} id
   */
  const fetchMovie = id => send(FETCH_MOVIE, { id });

  return (
    <MoviesContext.Provider
      value={{
        current,
        setSearchValue,
        fetchMovie,
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
