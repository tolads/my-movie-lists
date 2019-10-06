import { createContext } from 'react';

import ListsStore from './ListsStore';
import MoviesStore from './MoviesStore';

export const RootStoreContext = createContext();

class RootStore {
  constructor() {
    this.listsStore = new ListsStore(this);
    this.moviesStore = new MoviesStore(this);
  }
}

export default RootStore;
