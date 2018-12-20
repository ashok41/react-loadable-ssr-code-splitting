import React from 'react'
import { hydrate } from 'react-dom'
import configureStore from './store';
import Loadable from 'react-loadable';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import "../assets/style.css";

import { Provider as ReduxProvider } from 'react-redux'

const store = configureStore( window.__REDUX_STATE__ || {} );

window.main = () => {
  Loadable.preloadReady().then(() => {
	hydrate((
	  <ReduxProvider store={store}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	  </ReduxProvider>), document.getElementById('root'));
  });
};