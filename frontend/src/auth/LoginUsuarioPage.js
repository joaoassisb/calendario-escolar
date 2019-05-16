import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthApi from "./auth.api";

class LoginUsuarioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      error: false
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  login(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.error) {
      this.fecharMsgErro();
    }

    const { email, senha } = this.state;

    AuthApi.login({
      email,
      password: senha
    })
      .then(res => {
        this.props.history.push("/turmas");
      })
      .catch(err => {
        this.setState({
          error: "Credenciais inválidas"
        });
      });
  }

  fecharMsgErro() {
    this.setState({
      ...this.state,
      error: false
    });
  }

  render() {
    return (
      <div className="login-usuario-page mt-5 container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3 className="mb-3 text-center">Acesse sua conta</h3>

            {this.state.error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {this.state.error}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={this.fecharMsgErro.bind(this)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}

            <form onSubmit={e => this.login(e)} className="form">
              <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input
                  id="emailInput"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                  autoFocus
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
                  placeholder="Senha"
                  value={this.state.senha}
                  onChange={e => this.handleChange(e)}
                  required
                  className="form-control"
                />
              </div>

              <div className="text-center mb-4">
                <button className="btn btn-success" type="submit">
                  Entrar
                </button>
              </div>
            </form>

            <p className="text-center">
              <Link to="/cadastro">
                Não é cadastrado? Cadastre-se agora mesmo
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

LoginUsuarioPage.propTypes = {};

export default LoginUsuarioPage;
