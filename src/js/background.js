console.log('Lurking from the back, it is background.js!');
import '../img/icon-128.png';
import '../img/icon-34.png';
import {wrapStore} from 'react-chrome-redux';
import store from './store';

wrapStore(store, {
	portName: 'MakesCents'
});
