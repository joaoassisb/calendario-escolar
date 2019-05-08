import React from "react";
import { hydrate } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";

delete window.__PRELOADED_STATE__;

hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
