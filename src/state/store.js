import { types } from 'mobx-state-tree';
import { createContext } from 'react';

import * as api from 'api/api';
import ListsStore from './ListsStore';
import MoviesStore from './MoviesStore';

const Store = types.model('Store', {
  lists: ListsStore,
  movies: MoviesStore,
});

const id = Date.now();

const store = Store.create(
  {
    lists: {
      items: [
        { id, label: 'Favourites', movies: ['tt0111161'] },
        { id: 2, label: 'Watchlist', movies: [] },
      ],
      active: id,
    },
    movies: {
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
    },
  },
  { api },
);

export const Context = createContext();

export default store;
