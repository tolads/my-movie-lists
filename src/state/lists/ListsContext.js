import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import PropTypes from 'prop-types';

import {
  ADD_LIST,
  DELETE_LIST,
  MOVE_MOVIE_DOWN_IN_ACTIVE_LIST,
  MOVE_MOVIE_UP_IN_ACTIVE_LIST,
  REMOVE_MOVIE_FROM_ACTIVE_LIST,
  RENAME_LIST,
  SET_ACTIVE_LIST,
} from './eventTypes';
import listsMachine from './listsMachine';

export const ListsContext = createContext();

const ListsProvider = ({ children }) => {
  const [current, send] = useMachine(listsMachine);

  const addList = () => send(ADD_LIST);

  /**
   * @param {number} id
   * @param {string} label
   */
  const renameList = (id, label) => send(RENAME_LIST, { id, label });

  /**
   * @param {number} id
   */
  const deleteList = id => send(DELETE_LIST, { id });

  /**
   * @param {number} id
   */
  const setActiveList = id => send(SET_ACTIVE_LIST, { id });

  /**
   * @param {number} movieId
   */
  const removeMovieFromActiveList = movieId =>
    send(REMOVE_MOVIE_FROM_ACTIVE_LIST, { movieId });

  /**
   * @param {number} movieId
   */
  const moveMovieUpInActiveList = movieId =>
    send(MOVE_MOVIE_UP_IN_ACTIVE_LIST, { movieId });

  /**
   * @param {number} movieId
   */
  const moveMovieDownInActiveList = movieId =>
    send(MOVE_MOVIE_DOWN_IN_ACTIVE_LIST, { movieId });

  return (
    <ListsContext.Provider
      value={{
        current,
        addList,
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
