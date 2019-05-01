import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Form, FormInput } from "../components/forms";
import { http } from "../helpers/http";
import { navigate } from "../helpers/navigate.actions";

const validacoesFormulario = {
  name: {
    custom: [
      nome => {
        return nome.split(" ").filter(s => Boolean(s)).length >= 2;
      },
      "Ao menos um sobrenome deve ser informado"
    ]
  },
  repeatedPassword: {
    isEqualField: ["password", "Repita a mesma senha utilizada"]
  }
};

class CadastroUsuarioPage extends Component {
  cadastrar(usuario) {
    http.post("/api/user", usuario).then(() => {
      this.props.navigate("/login");
    });
  }

  render() {
    return (
      <div className="cadastro-usuario-page container">
        <div className="row my-5 p-3">
          <div className="col-md-6">
            {/* <p className="text-center">
              <Link to="/login">Já é cadastrado? Acesse agora mesmo sua conta</Link>
            </p> */}
          </div>

          <div className="col-md-6">
            <h3 className="mb-3">Cadastre-se agora mesmo</h3>

            <Form
              onSubmit={this.cadastrar.bind(this)}
              onSubmitLabel="Cadastrar"
              onSubmitClasses="btn-block text-light"
              validations={validacoesFormulario}
            >
              <FormInput
                name="name"
                type="text"
                label="Nome completo"
                required
              />
              <FormInput name="email" type="email" label="Email" required />
              <FormInput
                name="password"
                type="password"
                label="Senha"
                required
                minLength="6"
              />
              <FormInput
                name="repeatedPassword"
                type="password"
                label="Repetir senha"
                required
                minLength="6"
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

CadastroUsuarioPage.propTypes = {
  navigate: PropTypes.func
};

export default connect(
  null,
  {
    navigate
  }
)(CadastroUsuarioPage);
