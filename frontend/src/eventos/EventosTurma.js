import React, { Component } from "react";
import EventosApi from "./eventos.api";

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
    EventosApi.loadEventos({
      turma: this.props.turma,
      data: buildDateString(this.props.data)
    }).then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        eventos: res
      });
    });
  }

  render() {
    return (
      <div>
        Eventos Cadastrados
        <ul className="list-group">
          {this.state.eventos &&
            this.state.eventos.map(evento => (
              <li key={evento._id} className="list-group-item">
                {formatDate(evento.data)} - {evento.nome} ({evento.tipo})
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default EventosTurma;

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [ano, mes, dia] = value.split("-");

  return `${dia}/${mes}/${ano}`;
}

function pad(i) {
  return (i < 10 ? "0" : "") + i;
}

function buildDateString(date) {
  let value = new Date();

  if (date) {
    value = date;
  }

  const YYYY = value.getFullYear();
  const MM = pad(value.getMonth() + 1);
  const DD = pad(value.getDate());

  return `${YYYY}-${MM}-${DD}`;
}
