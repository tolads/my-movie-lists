import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = preloadedState => {
  const loggerMiddleware = createLogger({
    collapsed: true,
  });

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, loggerMiddleware),
  );

  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
