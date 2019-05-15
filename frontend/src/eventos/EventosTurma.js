import React, { Component } from "react";
import EventosApi from "./eventos.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";

import { buildDateString } from "../components/formatters";

class EventosTurma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventos: []
    };
  }

  componentDidMount() {
    this.loadEventos();
  }

  loadEventos() {
    this.setState({
      isLoading: true
    });

    EventosApi.loadEventos({
      turma: this.props.turma,
      data: buildDateString(this.props.data)
    }).then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        eventos: res,
        isLoading: false
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <h4 className="mr-2">
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin />
          </h4>
        </div>
      );
    }
    return (
      <div>
        {this.state.eventos.length === 0 ? (
          <div className="italico ">Nenhum evento adicionado ainda.</div>
        ) : (
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-3">
                  <span>
                    <strong>Tipo</strong>
                  </span>
                </div>
                <div className="col-3">
                  <span>
                    <strong>Matéria</strong>
                  </span>
                </div>
                <div className="col-3 text-center">
                  <span>
                    <strong>Nome</strong>
                  </span>
                </div>
                <div className="col-3 text-right">
                  <span>
                    <strong>Pontos</strong>
                  </span>
                </div>
              </div>
            </li>
            {this.state.eventos.map(evento => (
              <a
                key={evento._id}
                className="list-group-item list-group-item-action"
                href={`/turmas/${this.props.turma}/eventos/${evento._id}`}
              >
                <div className="row">
                  <div className="col-3">
                    <span>{evento.tipo}</span>
                  </div>
                  <div className="col-3">
                    <span>{evento.materia}</span>
                  </div>
                  <div className="col-3 text-center">
                    <span>{evento.nome}</span>
                  </div>
                  <div className="col-3 text-right">
                    <span>{evento.pontos || "-"}</span>
                  </div>
                </div>
              </a>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default EventosTurma;
