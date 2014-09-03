(function () {
  'use strict';

  /** @deprecated */
  var activityLog = [];

  /** @deprecated */
  var previousTabId = undefined;

  /** @deprecated */
  var currentTabId = undefined;

  var actions = {
    getLog: function() {
      return { nodes: stateManager.nodes };
    }
  };

  var stateManager = new StateManager({
    api: {
      baseUrl: "app.trailblazer.io",
      version: "v1"
    },
    eventAdapter:    ChromeEventAdapter,
    identityAdapter: ChromeIdentityAdapter
  });


  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log(request);
    switch (request.action) {
      case 'getLog':
        sendResponse({ data: actions.getLog() });
        break;
    }
  });

})();
