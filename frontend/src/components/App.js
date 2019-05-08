import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";
import LoginUsuarioPage from "../auth/LoginUsuarioPage";
import CadastroUsuarioPage from "../auth/CadastroUsuarioPage";

import EventosPage from "../eventos/EventosPage";

import "../styles.scss";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="counteudo">
          <Switch>
            <Route path="/" exact component={LoginUsuarioPage} />
            <Route path="/login" exact component={LoginUsuarioPage} />
            <Route path="/cadastro" exact component={CadastroUsuarioPage} />
            <Route path="/eventos" exact component={EventosPage} />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
