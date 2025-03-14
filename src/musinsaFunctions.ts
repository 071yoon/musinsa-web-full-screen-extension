export const onFullScreen = (toggle: boolean) => {
  if (toggle) {
    (function () {
      let queryOptions = { active: true, lastFocusedWindow: true };
      chrome.tabs.query(queryOptions, ([tab]) => {
        if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);

        // @ts-ignore
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            document.documentElement.style.setProperty("--max-width", "100%");
          },
          args: [],
        });
      });
    })();
  }
};
