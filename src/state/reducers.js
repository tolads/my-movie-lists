import { combineReducers } from 'redux';

import lists from './lists/reducer';
import movies from './movies/reducer';

export default combineReducers({ lists, movies });
