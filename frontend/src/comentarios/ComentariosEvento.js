import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faUserCircle from "@fortawesome/fontawesome-free-solid/faUserCircle";
import faPencilAlt from "@fortawesome/fontawesome-free-solid/faPencilAlt";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";

import { EditarComentario } from "./EditarComentario";
import ComentarioApi from "./ComentarioApi";
import { toShortDateTime } from "../components/formatters";

export class ComentariosEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modoEdicao: {},
      comentarios: []
    };
  }

  componentDidMount() {
    this.carregarComentarios();
  }

  carregarComentarios() {
    if (Object.keys(this.props.evento).length === 0) {
      return;
    }

    this.setState({
      isLoading: true
    });

    return ComentarioApi.loadComentarios(this.props.evento._id).then(res => {
      this.setState({
        ...this.state,
        isLoading: false,
        comentarios: res
      });
    });
  }

  excluir(comentario) {
    ComentarioApi.deleteEvento(comentario).then(() => {
      this.carregarComentarios();
    });
  }

  editar(comentario) {
    this.setState({
      modoEdicao: {
        [comentario._id]: true
      },
      comentarioId: comentario._id
    });
  }

  aoSalvar() {
    setTimeout(() => {
      this.carregarComentarios();
      this.fecharEdicao(() => {});
    }, 0);
  }

  fecharEdicao(next = function() {}) {
    this.setState(
      {
        modoEdicao: {
          [this.state.comentarioId]: false,
          comentarioId: ""
        }
      },
      next
    );
  }

  podeEditar(comentario) {
    return comentario.usuario && comentario.usuario._id === this.props.usuario;
  }

  renderComentarios(comentarios) {
    return comentarios.map(comentario => (
      <div className="media mt-2" key={comentario._id}>
        <div className="align-self-start mr-3">
          <FontAwesomeIcon icon={faUserCircle} size={"3x"} />
        </div>

        <div className="media-body">
          <div className="row mb-2">
            <h5 className="col-12 col-md-6 nome-usuario">
              {comentario.usuario.nome}
            </h5>

            <div className="col-12 col-md-6 d-inline-flex align-items-center justify-content-end">
              <h5 className="mb-0">{toShortDateTime(comentario.data)}</h5>

              {this.podeEditar(comentario) && (
                <React.Fragment>
                  <button
                    key="btnEditar"
                    type="button"
                    className="btn btn-sm btn-primary ml-2"
                    onClick={() => this.editar(comentario)}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} fixedWidth />
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger ml-2"
                    onClick={() => this.excluir(comentario)}
                  >
                    <FontAwesomeIcon icon={faTrash} fixedWidth={true} />
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>

          {this.state.modoEdicao[comentario._id] ? (
            <EditarComentario
              comentario={comentario}
              eventoId={this.props.evento._id}
              cancelar={this.fecharEdicao.bind(this)}
              aoSalvar={this.aoSalvar.bind(this)}
            />
          ) : (
            <p className="mt-2">{comentario.texto}</p>
          )}
        </div>
      </div>
    ));
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
      <div className="col-md-8 offset-md-2">
        <div className="mt-5">
          <h4>Comentários</h4>

          <EditarComentario
            comentario={{}}
            eventoId={this.props.evento._id}
            aoSalvar={this.aoSalvar.bind(this)}
            cancelar={this.fecharEdicao.bind(this)}
          />

          <div className="mt-5 comentarios">
            {this.renderComentarios(this.state.comentarios)}
          </div>
        </div>
      </div>
    );
  }
}
