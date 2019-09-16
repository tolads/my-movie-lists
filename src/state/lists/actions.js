export const ADD_LIST = 'ADD_LIST';
export const ADD_MOVIE_TO_ACTIVE_LIST = 'ADD_MOVIE_TO_ACTIVE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const MOVE_MOVIE_DOWN_IN_ACTIVE_LIST = 'MOVE_MOVIE_DOWN_IN_ACTIVE_LIST';
export const MOVE_MOVIE_UP_IN_ACTIVE_LIST = 'MOVE_MOVIE_UP_IN_ACTIVE_LIST';
export const REMOVE_MOVIE_FROM_ACTIVE_LIST = 'REMOVE_MOVIE_FROM_ACTIVE_LIST';
export const RENAME_LIST = 'RENAME_LIST';
export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';

export const addList = () => ({
  type: ADD_LIST,
  payload: { id: Date.now() },
});

/**
 * @param {number} id
 * @param {string} label
 */
export const renameList = (id, label) => ({
  type: RENAME_LIST,
  payload: { id, label },
});

/**
 * @param {number} id
 */
export const deleteList = id => ({
  type: DELETE_LIST,
  payload: { id },
});

/**
 * @param {number} id
 */
export const setActiveList = id => ({
  type: SET_ACTIVE_LIST,
  payload: { id },
});

/**
 * @param {number} movieId
 */
export const addMovieToActiveList = movieId => ({
  type: ADD_MOVIE_TO_ACTIVE_LIST,
  payload: { movieId },
});

/**
 * @param {number} movieId
 */
export const removeMovieFromActiveList = movieId => ({
  type: REMOVE_MOVIE_FROM_ACTIVE_LIST,
  payload: { movieId },
});

/**
 * @param {number} movieId
 */
export const moveMovieUpInActiveList = movieId => ({
  type: MOVE_MOVIE_UP_IN_ACTIVE_LIST,
  payload: { movieId },
});

/**
 * @param {number} movieId
 */
export const moveMovieDownInActiveList = movieId => ({
  type: MOVE_MOVIE_DOWN_IN_ACTIVE_LIST,
  payload: { movieId },
});
