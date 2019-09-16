import {
  MOVIE_RECEIVED,
  MOVIE_SEARCH_RESULT_RECEIVED,
  SET_IS_SEARCH_FETCHING,
  SET_SEARCH_VALUE_IN_STATE,
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

const moviesReducer = (state = defaultState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_IS_SEARCH_FETCHING:
      return {
        ...state,
        isSearchFetching: payload.isFetching,
      };

    case MOVIE_SEARCH_RESULT_RECEIVED:
      return {
        ...state,
        searchKeys: { ...state.searchKeys, [payload.key]: payload.movies },
      };

    case MOVIE_RECEIVED:
      return {
        ...state,
        items: { ...state.items, [payload.movie.imdbId]: payload.movie },
      };

    case SET_SEARCH_VALUE_IN_STATE:
      return {
        ...state,
        currentSearchValue: payload.value,
      };

    default:
      return state;
  }
};

export default moviesReducer;
