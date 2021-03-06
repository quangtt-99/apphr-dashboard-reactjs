import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './stores/store';
import { icons } from './asset/icon';
import '@coreui/coreui/dist/css/coreui.min.css';
import './i18n/i18n';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

React.icons = icons;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={loading}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
