import { Machine, assign, sendParent } from 'xstate';
import produce from 'immer';

import * as api from 'api/api';
import { ADD_MOVIE_TO_ACTIVE_LIST } from '../lists/eventTypes';
import { FETCH_MOVIE, SET_SEARCH_VALUE } from './eventTypes';

let rejectLastTimeout;

const searchMovies = (context, event) => {
  const trimmedKey = event.value.trim();
  return new Promise((resolve, reject) => {
    if (rejectLastTimeout) rejectLastTimeout();
    rejectLastTimeout = reject;
    setTimeout(resolve, 400);
  }).then(() => api.searchMovies(trimmedKey));
};

const fetchMovie = (context, event) => {
  return api.getMovie(event.id);
};

const moviesMachine = Machine(
  {
    id: 'movies',
    type: 'parallel',
    initial: 'idle',
    context: {
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
    },
    states: {
      search: {
        initial: 'idle',
        states: {
          idle: {},
          fetching: {
            invoke: {
              src: searchMovies,
              onError: {
                target: 'idle',
                actions: console.error,
              },
              onDone: {
                target: 'idle',
                actions: 'movieSearchResultReceived',
              },
            },
          },
        },
      },
      movie: {
        initial: 'idle',
        states: {
          idle: {},
          fetching: {
            invoke: {
              src: fetchMovie,
              onError: {
                target: 'idle',
                actions: console.error,
              },
              onDone: {
                target: 'idle',
                actions: 'movieReceived',
              },
            },
          },
        },
      },
    },
    on: {
      [SET_SEARCH_VALUE]: [
        {
          target: 'search.fetching',
          cond: 'shouldFetchMovies',
          actions: 'setSearchValueInState',
        },
        {
          target: 'search.idle',
          actions: 'setSearchValueInState',
        },
      ],
      [FETCH_MOVIE]: {
        target: 'movie.fetching',
        cond: 'shouldFetchMovie',
        actions: sendParent((context, event) => ({
          type: ADD_MOVIE_TO_ACTIVE_LIST,
          movieId: event.id,
        })),
      },
    },
  },
  {
    actions: {
      setSearchValueInState: assign(
        produce((draftContext, action) => {
          draftContext.currentSearchValue = action.value;
        }),
      ),
      movieSearchResultReceived: assign(
        produce((draftContext, event) => {
          draftContext.searchKeys[draftContext.currentSearchValue] = event.data;
        }),
      ),
      movieReceived: assign(
        produce((draftContext, event) => {
          draftContext.items[event.data.imdbId] = event.data;
        }),
      ),
    },
    guards: {
      shouldFetchMovies: (context, event) => {
        const trimmedKey = event.value.trim();
        return trimmedKey.length >= 3 && !context.searchKeys[trimmedKey];
      },
      shouldFetchMovie: (context, event) => {
        return !context.items[event.id];
      },
    },
  },
);

export default moviesMachine;
