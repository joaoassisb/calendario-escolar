import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";
import LoginUsuarioPage from "../auth/LoginUsuarioPage";
import CadastroUsuarioPage from "../auth/CadastroUsuarioPage";
import RecuperarSenhaPage from "../auth/RecuperarSenhaPage";

import EventosPage from "../eventos/EventosPage";

import "../styles.scss";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="counteudo">
          <Router>
            <Switch>
              <Route path="/" exact component={LoginUsuarioPage} />
              <Route path="/cadastro" exact component={CadastroUsuarioPage} />
              <Route
                path="/recuperar-senha"
                exact
                component={RecuperarSenhaPage}
              />
              <Route path="/eventos" exact component={EventosPage} />

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
