import React, { Component } from "react";
import EventosApi from "./eventos.api";
import qs from "query-string";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";

class EventosTurma extends Component {
  constructor(props) {
    super(props);

    const { data } = qs.parse(props.location.search) || "";

    this.state = {
      evento: {
        nome: "",
        data,
        tipo: "",
        turma: props.match.params.id
      }
    };
  }

  handleChange(e) {
    this.setState({
      evento: {
        ...this.state.evento,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    EventosApi.saveEvento(this.state.evento._id, this.state.evento).then(() => {
      this.props.history.push();
    });
  }

  getBackUrl() {
    return `/turmas/${this.props.match.params.id}/`;
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 mt-4">
        <div className="d-flex justify-content-between">
          <Link to={this.getBackUrl()}>
            <h3>
              <FontAwesomeIcon icon={faChevronLeft} />
            </h3>
          </Link>

          <h1>Adicionar Evento</h1>
          <span />
        </div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={this.state.evento.nome}
              onChange={e => this.handleChange(e)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select
              name="tipo"
              value={this.state.evento.tipo}
              onChange={e => this.handleChange(e)}
              className="form-control"
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="Prova">Prova</option>
              <option value="Atividade">Atividade</option>
              <option value="Apresentação/Seminário">
                Apresentação/Seminário
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={this.state.evento.data}
              onChange={e => this.handleChange(e)}
              className="form-control"
              required
            />
          </div>

          <div className="text-center mb-4">
            <button className="btn btn-success" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EventosTurma;
