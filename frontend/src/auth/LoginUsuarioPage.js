import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import qs from "query-string";

import { Form, FormInput } from "../components/forms";
import { login } from "./auth.redux";
import { navigate } from "../helpers/navigate.actions";

class LoginUsuarioPage extends Component {
  componentDidUpdate() {
    const { session } = this.props;

    this.redirectIfLoggedIn(session);
  }

  componentDidMount() {
    const { session } = this.props;

    this.redirectIfLoggedIn(session);
  }

  login({ email, senha }) {
    this.props.login({
      email,
      password: senha
    });
  }

  redirectIfLoggedIn(session) {
    const { navigate, urlQuery } = this.props;

    if (session.email) {
      navigate(urlQuery.redirectTo, null, true);
    }
  }

  render() {
    return (
      <div className="login-usuario-page container">
        <div className="row my-5 p-3">
          <div className="col-md-6">
            <h3 className="mb-3">Acesse sua conta</h3>

            <Form
              onSubmit={this.login.bind(this)}
              onSubmitLabel="Acessar"
              onSubmitClasses="btn-block text-light"
            >
              <FormInput name="email" type="email" label="Email" />
              <FormInput name="senha" type="password" label="Senha" />
            </Form>
          </div>

          <div className="col-md-6">
            <p className="text-center">
              {/* <Link to="/cadastro">Não é cadastrado? Cadastre-se agora mesmo</Link> */}
            </p>
            login por redes sociais
          </div>
        </div>
      </div>
    );
  }
}

LoginUsuarioPage.propTypes = {
  login: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  session: PropTypes.object,
  urlQuery: PropTypes.object
};

export default connect(
  (state, props) => ({
    session: state.session,
    urlQuery: qs.parse(props.location.search)
  }),
  {
    login,
    navigate
  }
)(LoginUsuarioPage);
