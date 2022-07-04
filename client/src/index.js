import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import store from './store/ReduxStore';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={ store }>
  	<App />
  </Provider>
); 