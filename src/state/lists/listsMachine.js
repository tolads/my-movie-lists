import { Machine, assign, spawn } from 'xstate';
import produce from 'immer';

import moviesMachine from '../movies/moviesMachine';
import {
  ADD_LIST,
  ADD_MOVIE_TO_ACTIVE_LIST,
  DELETE_LIST,
  MOVE_MOVIE_DOWN_IN_ACTIVE_LIST,
  MOVE_MOVIE_UP_IN_ACTIVE_LIST,
  REMOVE_MOVIE_FROM_ACTIVE_LIST,
  RENAME_LIST,
  SET_ACTIVE_LIST,
} from './eventTypes';

const id = Date.now();

const getActiveItem = context =>
  context.items.find(item => item.id === context.active);

const listsMachine = Machine(
  {
    id: 'lists',
    initial: 'active',
    context: {
      active: id,
      items: [
        { id, label: 'Favourites', movies: ['tt0111161'] },
        { id: 2, label: 'Watchlist', movies: [] },
      ],
    },
    entry: assign({
      movies: () => spawn(moviesMachine),
    }),
    states: {
      inactive: {},
      active: {
        on: {
          '': {
            target: 'inactive',
            cond: 'noItems',
          },
          [RENAME_LIST]: {
            actions: 'renameList',
          },
          [DELETE_LIST]: {
            actions: 'deleteList',
          },
          [SET_ACTIVE_LIST]: {
            actions: 'setActiveList',
          },
          [ADD_MOVIE_TO_ACTIVE_LIST]: {
            actions: 'addMovieToActiveList',
          },
          [REMOVE_MOVIE_FROM_ACTIVE_LIST]: {
            actions: 'removeMovieFromActiveList',
          },
          [MOVE_MOVIE_UP_IN_ACTIVE_LIST]: {
            actions: 'moveMovieUpInActiveList',
          },
          [MOVE_MOVIE_DOWN_IN_ACTIVE_LIST]: {
            actions: 'moveMovieDownInActiveList',
          },
        },
      },
    },
    on: {
      [ADD_LIST]: {
        target: '.active',
        actions: 'addList',
      },
    },
  },
  {
    actions: {
      addList: assign(
        produce(draftContext => {
          const newId = new Date();
          draftContext.active = newId;
          draftContext.items.push({ id: newId, label: '', movies: [] });
        }),
      ),
      renameList: assign(
        produce((draftContext, event) => {
          draftContext.items.find(item => item.id === event.id).label =
            event.label;
        }),
      ),
      deleteList: assign(
        produce((draftContext, event) => {
          draftContext.items = draftContext.items.filter(
            item => item.id !== event.id,
          );
          if (draftContext.active === event.id) {
            draftContext.active = draftContext.items.length
              ? draftContext.items[0].id
              : undefined;
          }
        }),
      ),
      setActiveList: assign(
        produce((draftContext, event) => {
          draftContext.active = event.id;
        }),
      ),
      addMovieToActiveList: assign(
        produce((draftContext, event) => {
          const activeItem = getActiveItem(draftContext);
          if (activeItem.movies.every(movieId => movieId !== event.movieId)) {
            activeItem.movies.push(event.movieId);
          }
        }),
      ),
      removeMovieFromActiveList: assign(
        produce((draftContext, event) => {
          const activeItem = getActiveItem(draftContext);
          activeItem.movies = activeItem.movies.filter(
            movieId => movieId !== event.movieId,
          );
        }),
      ),
      moveMovieUpInActiveList: assign(
        produce((draftContext, event) => {
          const activeItem = getActiveItem(draftContext);
          const { movies } = activeItem;
          const index = movies.indexOf(event.movieId);
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
        }),
      ),
      moveMovieDownInActiveList: assign(
        produce((draftContext, event) => {
          const activeItem = getActiveItem(draftContext);
          const { movies } = activeItem;
          const index = movies.indexOf(event.movieId);
          if (index === movies.length - 1) {
            activeItem.movies = [
              movies[movies.length - 1],
              ...movies.slice(0, -1),
            ];
          } else {
            activeItem.movies = [
              ...movies.slice(0, index),
              movies[index + 1],
              movies[index],
              ...movies.slice(index + 2),
            ];
          }
        }),
      ),
    },
    guards: {
      noItems: context => context.active === undefined,
    },
  },
);

export default listsMachine;
