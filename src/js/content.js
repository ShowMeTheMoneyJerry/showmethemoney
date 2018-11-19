console.log('Hey Ben! content.js is working!');

import '../css/popup.css';
import Greeting from './content/home.jsx';
import React from 'react';
import {render} from 'react-dom';

const anchor = document.createElement('div');
anchor.id = 'apple';

window.document.body.prepend(anchor);

render(<Greeting />, window.document.getElementById('apple'));
