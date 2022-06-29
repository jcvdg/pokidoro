import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose } from 'redux';

import App from './App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware())
)
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={ store }>
  	<App />
  </Provider>
); 