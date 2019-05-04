import React, { Component } from "react";

class EventosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      data: "",
      tipo: "",
      eventos: []
    };
  }

  componentDidMount() {
    this.loadEventos();
  }

  loadEventos() {
    fetch("/api/eventos")
      .then(res => res.json())
      .then(res => {
        if (!res) {
          return;
        }
        this.setState({
          ...this.state,
          eventos: res
        });
      });
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("/api/eventos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: this.state.nome,
        data: this.state.data,
        tipo: this.state.tipo
      })
    }).then(() => this.loadEventos());
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 mt-4">
        <h1>Adicionar Evento</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={this.state.nome}
              onChange={e => this.handleChange(e)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select
              name="tipo"
              value={this.state.tipo}
              onChange={e => this.handleChange(e)}
              className="form-control"
            >
              <option value="">Selecione um tipo</option>
              <option value="Prova">Prova</option>
              <option value="Atividade">Atividade</option>
            </select>
          </div>

          <div className="form-group">
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={this.state.data}
              onChange={e => this.handleChange(e)}
              className="form-control"
            />
          </div>

          <div className="text-center mb-4">
            <button className="btn btn-success" type="submit">
              Salvar
            </button>
          </div>
        </form>

        <div>
          <h1>Eventos</h1>
          <ul className="list-group">
            {this.state.eventos &&
              this.state.eventos.map(evento => (
                <li key={evento._id} className="list-group-item">
                  {formatDate(evento.data)} - {evento.nome} ({evento.tipo})
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default EventosPage;

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [ano, mes, dia] = value.split("-");

  return `${dia}/${mes}/${ano}`;
}
