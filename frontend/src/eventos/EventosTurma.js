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
        {this.state.eventos &&
          this.state.eventos.map(evento => (
            <div>
              {evento.tipo} - {evento.nome}
            </div>
          ))}
        {this.state.eventos.length === 0 && (
          <div className="italico ">Nenhum evento adicionado ainda.</div>
        )}
      </div>
    );
  }
}

export default EventosTurma;
