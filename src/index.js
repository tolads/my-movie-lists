import React from 'react';
import ReactDOM from 'react-dom';

import ListsProvider from 'state/lists/ListsContext';
import MoviesProvider from 'state/movies/MoviesContext';
import App from 'view/App';

const renderApp = () => {
  ReactDOM.render(
    <ListsProvider>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </ListsProvider>,
    document.getElementById('root'),
  );
};

renderApp();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('view/App', renderApp);
}
