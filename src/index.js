import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import RootStore, { RootStoreContext } from 'state/RootStore';
import App from 'view/App';

configure({ enforceActions: 'observed' });

const renderApp = () => {
  ReactDOM.render(
    <RootStoreContext.Provider value={new RootStore()}>
      <App />
    </RootStoreContext.Provider>,
    document.getElementById('root'),
  );
};

renderApp();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('view/App', renderApp);
}
