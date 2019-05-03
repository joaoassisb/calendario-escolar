import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";

import App from "./components/App";
import { getStore } from "./helpers/get-store";

const history = createHistory();

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
const store = getStore(preloadedState, history);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
