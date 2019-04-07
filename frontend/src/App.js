import React, { Component } from "react";

class App extends Component {
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
      <div>
        <h1>Teste api Eventos</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={this.state.nome}
                onChange={e => this.handleChange(e)}
              />
            </label>
          </div>

          <div>
            <label>
              Tipo:
              <select
                name="tipo"
                value={this.state.tipo}
                onChange={e => this.handleChange(e)}
              >
                <option value="">Selecione um tipo</option>
                <option value="Prova">Prova</option>
                <option value="Atividade">Atividade</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Data:
              <input
                type="date"
                name="data"
                value={this.state.data}
                onChange={e => this.handleChange(e)}
              />
            </label>
          </div>
          <input type="submit" />
        </form>

        <div>
          <ul>
            {this.state.eventos &&
              this.state.eventos.map(evento => (
                <li key={evento._id}>
                  {formatDate(evento.data)} - {evento.nome} ({evento.tipo})
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [ano, mes, dia] = value.split("-");

  return `${dia}/${mes}/${ano}`;
}
