import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";

import EventosApi from "./eventos.api";
import AuthApi from "../auth/auth.api";

import { dateStr2Locale } from "../components/formatters";

class DetalhesEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evento: {},
      modalIsOpen: false
    };
  }

  componentDidMount() {
    this.loadEvento();
    this.loadUsuario();
  }

  loadEvento() {
    this.setState({
      isLoading: true
    });

    const { id } = this.props.match.params;

    EventosApi.loadEvento(id).then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        evento: res,
        isLoading: false
      });
    });
  }

  loadUsuario() {
    AuthApi.session().then(res => {
      this.setState({
        ...this.state,
        usuario: res.id
      });
    });
  }

  excluir() {
    const { id, turmaId } = this.props.match.params;

    EventosApi.deleteEvento(id).then(() => {
      this.props.history.push(`/turmas/${turmaId}`);
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

    const { turmaId, id } = this.props.match.params;
    const { evento } = this.state;

    return (
      <div className="container my-5">
        <div className="card mt-5">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <Link to={`/turmas/${turmaId}`}>
                <h3>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </h3>
              </Link>

              <h3>{this.state.evento.nome}</h3>

              <div />
            </div>
          </div>

          <div className="card-body">
            <div className="mt-">
              <div className="row">
                <div className="col-md-6">
                  <strong>Data: </strong>
                  {dateStr2Locale(evento.data)}
                </div>
                <div className="col-md-6">
                  <strong>Tipo: </strong>
                  {evento.tipo}
                </div>
                <div className="col-md-6">
                  <strong>Matéria: </strong>
                  {evento.materia}
                </div>
                <div className="col-md-6">
                  <strong>Pontos: </strong>
                  {evento.pontos || "-"}
                </div>
              </div>
            </div>
          </div>

          {this.state.evento.usuarioCriador === this.state.usuario && (
            <div className="card-footer text-center">
              <button
                className="btn btn-danger mr-4"
                onClick={this.excluir.bind(this)}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span className="ml-2">Excluir </span>
              </button>
              <Link to={`/turmas/${turmaId}/eventos/${id}/editar`}>
                <button className="btn btn-success mr-3">
                  <FontAwesomeIcon icon={faEdit} />
                  <span className="ml-2">Editar </span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DetalhesEvento;
