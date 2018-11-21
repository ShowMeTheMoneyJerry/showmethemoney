import '../css/popup.css';
import Greeting from './popup/greeting_component.jsx';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

render(
  <Provider store={store}>
    <Greeting />
  </Provider>,
  window.document.getElementById('app-container')
);
