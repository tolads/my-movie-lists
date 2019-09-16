import React from 'react';
import ReactDOM from 'react-dom';

import App from 'view/App';

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('view/App', renderApp);
}
