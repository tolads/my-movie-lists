import {
  ADD_LIST,
  ADD_MOVIE_TO_ACTIVE_LIST,
  DELETE_LIST,
  MOVE_MOVIE_DOWN_IN_ACTIVE_LIST,
  MOVE_MOVIE_UP_IN_ACTIVE_LIST,
  REMOVE_MOVIE_FROM_ACTIVE_LIST,
  RENAME_LIST,
  SET_ACTIVE_LIST,
} from './actions';

const id = Date.now();
export const defaultState = {
  items: [
    { id, label: 'Favourites', movies: ['tt0111161'] },
    { id: 2, label: 'Watchlist', movies: [] },
  ],
  active: id,
};

const updateMoviesInActiveList = (state, fn) => ({
  ...state,
  items: state.items.map(item => {
    if (item.id !== state.active) {
      return item;
    }
    return { ...item, movies: fn(item.movies) };
  }),
});

const listsReducer = (state = defaultState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_LIST:
      return {
        ...state,
        active: payload.id,
        items: [...state.items, { id: payload.id, label: '', movies: [] }],
      };

    case RENAME_LIST:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== payload.id) {
            return item;
          }
          return { ...item, label: payload.label };
        }),
      };

    case DELETE_LIST: {
      const newItems = state.items.filter(item => item.id !== payload.id);
      if (state.active === payload.id) {
        return {
          ...state,
          items: newItems,
          active: newItems.length ? newItems[0].id : undefined,
        };
      }
      return { ...state, items: newItems };
    }

    case SET_ACTIVE_LIST:
      return { ...state, active: payload.id };

    case ADD_MOVIE_TO_ACTIVE_LIST:
      return updateMoviesInActiveList(state, movies => {
        if (movies.some(movieId => movieId === payload.movieId)) {
          return movies;
        }
        return [...movies, payload.movieId];
      });

    case REMOVE_MOVIE_FROM_ACTIVE_LIST:
      return updateMoviesInActiveList(state, movies => {
        return movies.filter(movieId => movieId !== payload.movieId);
      });

    case MOVE_MOVIE_UP_IN_ACTIVE_LIST:
      return updateMoviesInActiveList(state, movies => {
        const index = movies.indexOf(payload.movieId);
        if (index === 0) {
          return [...movies.slice(1), movies[0]];
        }
        return [
          ...movies.slice(0, index - 1),
          movies[index],
          movies[index - 1],
          ...movies.slice(index + 1),
        ];
      });

    case MOVE_MOVIE_DOWN_IN_ACTIVE_LIST:
      return updateMoviesInActiveList(state, movies => {
        const index = movies.indexOf(payload.movieId);
        if (index === movies.length - 1) {
          return [movies[movies.length - 1], ...movies.slice(0, -1)];
        }
        return [
          ...movies.slice(0, index),
          movies[index + 1],
          movies[index],
          ...movies.slice(index + 2),
        ];
      });

    default:
      return state;
  }
};

export default listsReducer;
