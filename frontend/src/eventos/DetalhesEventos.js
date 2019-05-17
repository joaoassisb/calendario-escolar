import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";

import EventosApi from "./eventos.api";
import AuthApi from "../auth/auth.api";
import { ModalDeletarTurma } from "./ModalDeletarEvento";
import { dateStr2Locale } from "../components/formatters";
import { ComentariosEvento } from "../comentarios/ComentariosEvento";

class DetalhesEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evento: {},
      modalIsOpen: false
    };

    this.voltar = this.voltar.bind(this);
  }

  componentDidMount() {
    this.loadEvento();
    this.loadUsuario();
  }

  voltar() {
    const { turmaId } = this.props.match.params;

    this.props.history.push(`/turmas/${turmaId}`);
  }

  loadEvento() {
    this.setState({
      isLoading: true
    });

    const { id } = this.props.match.params;

    EventosApi.loadEvento(id)
      .then(res => {
        if (!res) {
          return;
        }

        this.setState({
          ...this.state,
          evento: res,
          isLoading: false
        });
      })
      .catch(err => {
        this.voltar();
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
              <ModalDeletarTurma
                evento={this.state.evento}
                turmaId={turmaId}
                reloadData={this.voltar}
              />
              <Link to={`/turmas/${turmaId}/eventos/${id}/editar`}>
                <button className="btn btn-success mr-3">
                  <FontAwesomeIcon icon={faEdit} />
                  <span className="ml-2">Editar </span>
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="comentarios my-4">
          <ComentariosEvento
            evento={this.state.evento}
            usuario={this.state.usuario}
          />
        </div>
      </div>
    );
  }
}

export default DetalhesEvento;
