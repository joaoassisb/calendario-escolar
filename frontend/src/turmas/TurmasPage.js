import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faSearchPlus from "@fortawesome/fontawesome-free-solid/faSearchPlus";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";

import TurmasApi from "./turmas.api";
import AuthApi from "../auth/auth.api";

import { ModalEntrarTurma } from "./ModalEntrarTurma";
import { ModalSairTurma } from "./ModalSairTurma";
import { ModalDeletarTurma } from "./ModalDeletarTurma";

class TurmasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turmas: [],
      usuario: {}
    };

    this.reloadData = this.reloadData.bind(this);
  }

  reloadData() {
    this.loadTurmas();
  }

  componentDidMount() {
    this.loadTurmas();
    this.loadUsuario();
  }

  novaTurma(e) {
    e.preventDefault();
    this.props.history.push("/turmas/nova");
  }

  loadUsuario() {
    AuthApi.session().then(res => {
      this.setState({
        ...this.state,
        usuario: res.id
      });
    });
  }

  loadTurmas() {
    this.setState({
      isLoading: true
    });

    TurmasApi.loadTurmas().then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        turmas: res,
        isLoading: false
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="text-center mt-4">
          <h4 className="mr-2">
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin />
          </h4>
        </div>
      );
    }
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h3>Turmas</h3>

          <button className="btn btn-success" onClick={e => this.novaTurma(e)}>
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2">Nova Turma</span>
          </button>
        </div>

        <div className="d-flex justify-content-end my-4">
          <ModalEntrarTurma reloadData={this.reloadData} />
        </div>

        <ul className="list-group mt-4">
          {this.state.turmas.length === 0 ? (
            <li className="list-group-item italico">
              Nenhuma turma encontrada.
            </li>
          ) : (
            <React.Fragment>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-4">
                    <strong>Nome:</strong>
                  </div>

                  <div className="col-4">
                    <strong>Código:</strong>
                  </div>

                  <div className="col-4 text-right">
                    <strong>Ações:</strong>
                  </div>
                </div>
              </li>
              {this.state.turmas.map(turma => (
                <div className="list-group-item" key={turma._id}>
                  <div className="row">
                    <div className="col-4">{turma.nome}</div>
                    <div className="col-4">{turma.codigo}</div>
                    <div className="col-4 text-right">
                      <Link to={`/turmas/${turma._id}`} key={turma._id}>
                        <button className="btn btn-outline-primary mr-2 mb-2">
                          <FontAwesomeIcon icon={faSearchPlus} />
                        </button>
                      </Link>
                      {this.state.usuario === turma.usuarioCriador && (
                        <Link to={`/turmas/${turma._id}/editar`}>
                          <button className="btn btn-outline-info mr-2 mb-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </Link>
                      )}

                      {this.state.usuario === turma.usuarioCriador ? (
                        <ModalDeletarTurma
                          turma={turma}
                          aluno={this.state.usuario}
                          reloadData={this.reloadData}
                        />
                      ) : (
                        <ModalSairTurma
                          turma={turma}
                          aluno={this.state.usuario}
                          reloadData={this.reloadData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )}
        </ul>
      </div>
    );
  }
}

export default TurmasPage;
