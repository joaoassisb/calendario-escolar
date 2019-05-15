import React, { Component } from "react";
import { Link } from "react-router-dom";

import TurmasApi from "./turmas.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";

class LoginUsuarioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turma: {
        nome: "",
        materias: [],
        _id: null,
        nomeMateria: ""
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.setState({
        ...this.state,
        isLoading: true
      });
      TurmasApi.loadTurma(id).then(res => {
        if (!res) {
          return;
        }

        this.setState({
          turma: res,
          isLoading: false
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

  incluirMateria() {
    const { materias, nomeMateria } = this.state.turma;

    if (!nomeMateria || nomeMateria === "") {
      alert("Insira o nome da matéria para adicioná-la a turma");
    }

    materias.push({
      nome: nomeMateria
    });

    this.setState({
      turma: {
        ...this.state.turma,
        nomeMateria: "",
        materias
      }
    });
  }

  removerMateria(index) {
    const { materias } = this.state.turma;

    materias.splice(index, 1);

    this.setState({
      turma: {
        ...this.state.turma,
        materias
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="text-center mt-5">
          <h4 className="mr-2">
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin />
          </h4>
        </div>
      );
    }
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

          <label htmlFor="nome">Matérias</label>
          <div className="mb-4">
            <ul className="list-group">
              {this.state.turma.materias.map((materia, index) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={index}
                >
                  <span>{materia.nome}</span>

                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => this.removerMateria(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
              {this.state.turma.materias.length === 0 && (
                <li className="list-group-item italico ">
                  Nenhuma matéria adicionada ainda.
                </li>
              )}
            </ul>
          </div>
          <div className="input-group mb-3">
            <input
              id="nomeMateria"
              type="text"
              name="nomeMateria"
              placeholder="Nome da matéria"
              value={this.state.turma.nomeMateria}
              onChange={e => this.handleChange(e)}
              className="form-control"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => this.incluirMateria()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
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
