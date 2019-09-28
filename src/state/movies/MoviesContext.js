import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import moviesStore from './MoviesStore';

export const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  return (
    <MoviesContext.Provider value={moviesStore}>
      {children}
    </MoviesContext.Provider>
  );
};

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MoviesProvider;
