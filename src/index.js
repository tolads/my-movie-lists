import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'state/store';
import App from 'view/App';

const store = configureStore();

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

renderApp();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('view/App', renderApp);
}
