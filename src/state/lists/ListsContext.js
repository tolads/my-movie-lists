import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import listsStore from './ListsStore';

export const ListsContext = createContext();

const ListsProvider = ({ children }) => {
  return (
    <ListsContext.Provider value={listsStore}>{children}</ListsContext.Provider>
  );
};

ListsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListsProvider;
