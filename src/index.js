import React from 'react';
import ReactDOM from 'react-dom';

import store, { Context } from 'state/store';
import App from 'view/App';

const renderApp = () => {
  ReactDOM.render(
    <Context.Provider value={store}>
      <App />
    </Context.Provider>,
    document.getElementById('root'),
  );
};

renderApp();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('view/App', renderApp);
}
