import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AuthApi from "./auth.api";

class CadastroUsuarioPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      email: "",
      senha: "",
      senhaRepetida: ""
    };
  }

  handleChange({ target }) {
    const validacoes = {
      senhaRepetida: value => {
        if (value !== this.state.senha) {
          return "As senhas devem ser iguais.";
        }

        return "";
      }
    };

    if (validacoes[target.name]) {
      const mensagemValidacao = validacoes[target.name](target.value);
      target.setCustomValidity(mensagemValidacao ? mensagemValidacao : "");
    }

    this.setState({
      [target.name]: target.value
    });
  }

  cadastrar(e) {
    e.preventDefault();
    e.stopPropagation();

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      password: this.state.senha
    };

    return AuthApi.cadastrarUsuario(usuario).then(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="cadastro-usuario-page my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3 className="mb-3 text-center">Cadastre-se </h3>

            <form onSubmit={e => this.cadastrar(e)} className="form">
              <div className="form-group">
                <label htmlFor="nomeInput">Nome</label>
                <input
                  id="nomeInput"
                  type="text"
                  name="nome"
                  value={this.state.nome}
                  onChange={e => this.handleChange(e)}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input
                  id="emailInput"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="senhaInput">Senha</label>

                <input
                  id="senhaInput"
                  type="password"
                  name="senha"
                  value={this.state.senha}
                  onChange={e => this.handleChange(e)}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="senhaInput">Repita sua senha</label>

                <input
                  id="senhaRepetidaInput"
                  type="password"
                  name="senhaRepetida"
                  value={this.state.senhaRepetida}
                  onChange={e => this.handleChange(e)}
                  required
                  className="form-control"
                />
              </div>

              <div className="text-center mb-4">
                <Link to="/">
                  <button className="btn btn-danger mr-2" type="button">
                    Voltar
                  </button>
                </Link>

                <button className="btn btn-success" type="submit">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CadastroUsuarioPage.propTypes = {
  navigate: PropTypes.func
};

export default CadastroUsuarioPage;
