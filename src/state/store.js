import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger({
    collapsed: true,
  });

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, loggerMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
