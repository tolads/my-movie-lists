import { createActions } from 'redux-actions';

export const {
  addList,
  addMovieToActiveList,
  deleteList,
  moveMovieDownInActiveList,
  moveMovieUpInActiveList,
  removeMovieFromActiveList,
  renameList,
  setActiveList,
} = createActions({
  ADD_LIST: () => ({ id: Date.now() }),

  /**
   * @param {number} id
   * @param {string} label
   */
  RENAME_LIST: (id, label) => ({ id, label }),

  /**
   * @param {number} id
   */
  DELETE_LIST: id => ({ id }),

  /**
   * @param {number} id
   */
  SET_ACTIVE_LIST: id => ({ id }),

  /**
   * @param {number} movieId
   */
  ADD_MOVIE_TO_ACTIVE_LIST: movieId => ({ movieId }),

  /**
   * @param {number} movieId
   */
  REMOVE_MOVIE_FROM_ACTIVE_LIST: movieId => ({ movieId }),

  /**
   * @param {number} movieId
   */
  MOVE_MOVIE_UP_IN_ACTIVE_LIST: movieId => ({ movieId }),

  /**
   * @param {number} movieId
   */
  MOVE_MOVIE_DOWN_IN_ACTIVE_LIST: movieId => ({ movieId }),
});
