import produce from 'immer';

import {
  ADD_LIST,
  ADD_MOVIE_TO_ACTIVE_LIST,
  DELETE_LIST,
  MOVE_MOVIE_DOWN_IN_ACTIVE_LIST,
  MOVE_MOVIE_UP_IN_ACTIVE_LIST,
  REMOVE_MOVIE_FROM_ACTIVE_LIST,
  RENAME_LIST,
  SET_ACTIVE_LIST,
} from './actionTypes';

const id = Date.now();
export const defaultState = {
  items: [
    { id, label: 'Favourites', movies: ['tt0111161'] },
    { id: 2, label: 'Watchlist', movies: [] },
  ],
  active: id,
};

// eslint-disable-next-line consistent-return
const listsReducer = produce((draftState = defaultState, action) => {
  const { payload, type } = action;
  const activeItem = draftState.items.find(
    item => item.id === draftState.active,
  );

  switch (type) {
    case ADD_LIST:
      draftState.active = payload.id;
      draftState.items.push({ id: payload.id, label: '', movies: [] });
      break;

    case RENAME_LIST:
      draftState.items.find(item => item.id === payload.id).label =
        payload.label;
      break;

    case DELETE_LIST:
      draftState.items = draftState.items.filter(
        item => item.id !== payload.id,
      );
      if (draftState.active === payload.id) {
        draftState.active = draftState.items.length
          ? draftState.items[0].id
          : undefined;
      }
      break;

    case SET_ACTIVE_LIST:
      draftState.active = payload.id;
      break;

    case ADD_MOVIE_TO_ACTIVE_LIST:
      if (activeItem.movies.every(movieId => movieId !== payload.movieId)) {
        activeItem.movies.push(payload.movieId);
      }
      break;

    case REMOVE_MOVIE_FROM_ACTIVE_LIST:
      activeItem.movies = activeItem.movies.filter(
        movieId => movieId !== payload.movieId,
      );
      break;

    case MOVE_MOVIE_UP_IN_ACTIVE_LIST: {
      const { movies } = activeItem;
      const index = movies.indexOf(payload.movieId);
      if (index === 0) {
        activeItem.movies = [...movies.slice(1), movies[0]];
      } else {
        activeItem.movies = [
          ...movies.slice(0, index - 1),
          movies[index],
          movies[index - 1],
          ...movies.slice(index + 1),
        ];
      }
      break;
    }

    case MOVE_MOVIE_DOWN_IN_ACTIVE_LIST: {
      const { movies } = activeItem;
      const index = movies.indexOf(payload.movieId);
      if (index === movies.length - 1) {
        activeItem.movies = [movies[movies.length - 1], ...movies.slice(0, -1)];
      } else {
        activeItem.movies = [
          ...movies.slice(0, index),
          movies[index + 1],
          movies[index],
          ...movies.slice(index + 2),
        ];
      }
      break;
    }

    default:
      return draftState;
  }
});

export default listsReducer;
