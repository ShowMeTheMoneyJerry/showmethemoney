console.log("Lurking from the back, it is background.js!");
import "../img/icon-128.png";
import "../img/icon-34.png";
import "../img/Badge.png";
import { wrapStore } from "react-chrome-redux";
import store from "./store";

wrapStore(store, {
  portName: "MakesCents"
});

chrome.browserAction.setBadgeText({
  text: ""
});

chrome.browserAction.getBadgeText({}, function(result) {
  //   alert('Badge text = ' + result);
  return result;
});

// chrome.browserAction.setBadgeBackgroundColor({
//   color: [200, 0, 0, 100],
// });
