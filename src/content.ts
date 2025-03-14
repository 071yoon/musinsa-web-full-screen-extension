// will fix later

import { onFullScreen } from "./musinsaFunctions";

// @ts-ignore
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (sender.tab && sender.tab.status === "complete") {
    onFullScreen(true);
  }
});
