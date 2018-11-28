console.log('Lurking from the back, it is background.js!');
import '../img/icon-128.png';
import '../img/icon-34.png';
import '../img/Badge.png';
import {wrapStore} from 'react-chrome-redux';
import store from './store';
const CronJob = require('cron').CronJob;

const price = store.getState().companies.aapl.recentPrice;

const test = new CronJob(
	'*/1 * * * * *',
	function() {
		console.log(store.getState().companies.aapl.recentPrice);
		if (store.getState().companies.aapl.setting) {
			let price = store.getState().companies.aapl.recentPrice;
			let priceHigh = store.getState().companies.aapl.setting.priceHigh;
			let priceLow = store.getState().companies.aapl.setting.priceLow;
			if (priceHigh < price) {
				chrome.browserAction.setBadgeText({
					text: 'AAPL'
				});

				chrome.browserAction.setBadgeBackgroundColor({
					color: [ 0, 200, 0, 100 ]
				});
			} else if (priceLow > price) {
				chrome.browserAction.setBadgeText({
					text: 'AAPL'
				});

				chrome.browserAction.setBadgeBackgroundColor({
					color: [ 200, 0, 0, 100 ]
				});
			} else {
				chrome.browserAction.setBadgeText({
					text: ''
				});
			}
		}
	},
	null,
	true,
	'America/New_York'
);

wrapStore(store, {
	portName: 'MakesCents'
});

// chrome.browserAction.getBadgeText({}, function(result) {
// 	//   alert('Badge text = ' + result);
// 	return result;
// });
