import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { register } from "./serviceWorker";

import { getStore } from "./helpers/get-store";

ReactDOM.render(<App />, document.getElementById("root"));
register();
