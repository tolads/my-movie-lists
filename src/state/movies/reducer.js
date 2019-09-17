import produce from 'immer';

import {
  movieReceived,
  movieSearchResultReceived,
  setIsSearchFetching,
  setSearchValue,
} from './actions';

export const defaultState = {
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
  searchKeys: {},
  currentSearchValue: '',
  isSearchFetching: false,
};

// eslint-disable-next-line consistent-return
const moviesReducer = produce((draftState = defaultState, action) => {
  const { payload, type } = action;

  switch (type) {
    case setIsSearchFetching.toString():
      draftState.isSearchFetching = payload.isFetching;
      break;

    case movieSearchResultReceived.toString():
      draftState.searchKeys[payload.key] = payload.movies;
      break;

    case movieReceived.toString():
      draftState.items[payload.movie.imdbId] = payload.movie;
      break;

    case setSearchValue.toString():
      draftState.currentSearchValue = payload.value;
      break;

    default:
      return draftState;
  }
});

export default moviesReducer;
