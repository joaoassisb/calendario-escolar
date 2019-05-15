import React, { Component } from "react";
import { Link } from "react-router-dom";

import TurmasApi from "./turmas.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";

class LoginUsuarioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turma: {
        nome: "",
        _id: null
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      TurmasApi.loadTurma(id).then(res => {
        if (!res) {
          return;
        }

        this.setState({
          turma: res
        });
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      turma: {
        ...this.state.turma,
        [target.name]: target.value
      }
    });
  }

  criarTurma(e) {
    e.preventDefault();
    e.stopPropagation();

    TurmasApi.saveTurma(this.state.turma._id, {
      ...this.state.turma
    }).then(res => {
      this.props.history.push(`/turmas/${this.state.turma._id ? res._id : ""}`);
    });
  }

  render() {
    return (
      <div className="editar-turma-page mt-5 container">
        <div className="d-flex justify-content-between">
          <Link to="/turmas">
            <h3>
              <FontAwesomeIcon icon={faChevronLeft} />
            </h3>
          </Link>
          <h3 className="mb-3 text-center">
            {this.state.turma._id ? "Editar" : "Novar"} Turma
          </h3>
          <span />
        </div>

        <form onSubmit={e => this.criarTurma(e)} className="form mt-5">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder="Nome da turma"
              value={this.state.turma.nome}
              onChange={e => this.handleChange(e)}
              autoFocus
              required
              className="form-control"
            />
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-success" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

LoginUsuarioPage.propTypes = {};

export default LoginUsuarioPage;
