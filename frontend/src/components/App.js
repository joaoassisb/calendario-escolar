import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./Header";
import Footer from "./Footer";

import LoginUsuarioPage from "../auth/LoginUsuarioPage";
import CadastroUsuarioPage from "../auth/CadastroUsuarioPage";

import TurmasPage from "../turmas/TurmasPage";
import EditarTurma from "../turmas/EditarTurma";
import DetalhesTurma from "../turmas/DetalhesTurma";

import EditarEventoPage from "../eventos/EditarEventoPage";
import DetalhesEventos from "../eventos/DetalhesEventos";

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
            <Route path="/turmas" exact component={TurmasPage} />
            <Route path="/turmas/nova" exact component={EditarTurma} />
            <Route path="/turmas/:id" exact component={DetalhesTurma} />
            <Route path="/turmas/:id/editar" exact component={EditarTurma} />
            <Route
              path="/turmas/:turmaId/eventos/novo"
              exact
              component={EditarEventoPage}
            />
            <Route
              path="/turmas/:turmaId/eventos/:id"
              exact
              component={DetalhesEventos}
            />
            <Route
              path="/turmas/:turmaId/eventos/:id/editar"
              exact
              component={EditarEventoPage}
            />
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
