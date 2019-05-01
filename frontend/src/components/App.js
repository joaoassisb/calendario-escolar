import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";

import EventosPage from "../eventos/EventosPage";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="counteudo">
          <Router>
            <Switch>
              <Route path="/" exact component={EventosPage} />
              <Route component={NotFound} />
            </Switch>
          </Router>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
