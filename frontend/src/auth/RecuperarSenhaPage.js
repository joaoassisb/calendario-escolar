import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { http } from "../helpers/http";
import { navigate } from "../helpers/navigate.actions";

class RecuperarSenhaPage extends Component {
  cadastrar(usuario) {
    http.post("/api/user", usuario).then(() => {
      this.props.navigate("/login");
    });
  }

  render() {
    return <div className="cadastro-usuario-page container" />;
  }
}

RecuperarSenhaPage.propTypes = {
  navigate: PropTypes.func
};

export default connect(
  null,
  {
    navigate
  }
)(RecuperarSenhaPage);
