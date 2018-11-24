console.log('Lurking from the back, it is background.js!');

import {wrapStore} from 'react-chrome-redux';
import store from './store';

wrapStore(store, {
	portName: 'MakesCents'
});
