import '../img/icon-128.png';
import '../img/icon-34.png';

console.log('hello to esta from the background.js');

import {wrapStore} from 'react-chrome-redux';
import store from './store';

wrapStore(store, {
	portName: 'MakesCents'
});
