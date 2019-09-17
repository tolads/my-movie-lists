import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

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
import reducer, { defaultState } from './reducer';

export const ListsContext = createContext();

const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const addList = () =>
    dispatch({
      type: ADD_LIST,
      payload: { id: Date.now() },
    });

  /**
   * @param {number} id
   * @param {string} label
   */
  const renameList = (id, label) =>
    dispatch({
      type: RENAME_LIST,
      payload: { id, label },
    });

  /**
   * @param {number} id
   */
  const deleteList = id =>
    dispatch({
      type: DELETE_LIST,
      payload: { id },
    });

  /**
   * @param {number} id
   */
  const setActiveList = id =>
    dispatch({
      type: SET_ACTIVE_LIST,
      payload: { id },
    });

  /**
   * @param {number} movieId
   */
  const addMovieToActiveList = movieId =>
    dispatch({
      type: ADD_MOVIE_TO_ACTIVE_LIST,
      payload: { movieId },
    });

  /**
   * @param {number} movieId
   */
  const removeMovieFromActiveList = movieId =>
    dispatch({
      type: REMOVE_MOVIE_FROM_ACTIVE_LIST,
      payload: { movieId },
    });

  /**
   * @param {number} movieId
   */
  const moveMovieUpInActiveList = movieId =>
    dispatch({
      type: MOVE_MOVIE_UP_IN_ACTIVE_LIST,
      payload: { movieId },
    });

  /**
   * @param {number} movieId
   */
  const moveMovieDownInActiveList = movieId =>
    dispatch({
      type: MOVE_MOVIE_DOWN_IN_ACTIVE_LIST,
      payload: { movieId },
    });

  return (
    <ListsContext.Provider
      value={{
        state,
        addList,
        addMovieToActiveList,
        deleteList,
        moveMovieDownInActiveList,
        moveMovieUpInActiveList,
        removeMovieFromActiveList,
        renameList,
        setActiveList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

ListsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListsProvider;
