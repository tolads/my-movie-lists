import { types } from 'mobx-state-tree';
import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import * as api from 'api/api';
import ListsStore from './ListsStore';
import MoviesStore from './MoviesStore';

const Store = types.model('Store', {
  lists: types.optional(ListsStore, () => {
    const id = Date.now();
    return {
      items: [
        { id, label: 'Favourites', movies: ['tt0111161'] },
        { id: 2, label: 'Watchlist', movies: [] },
      ],
      active: id,
    };
  }),
  movies: types.optional(MoviesStore, () => ({
    items: {
      tt0111161: {
        poster:
          'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        title: 'The Shawshank Repemption',
        year: '1994',
        genre: 'Drama',
        imdbId: 'tt0111161',
        rating: '9.3',
      },
    },
  })),
});

const store = Store.create({}, { api });

export const Context = createContext();

const Provider = ({ children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
