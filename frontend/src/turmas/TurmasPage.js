import React, { Component } from "react";
import { Link } from "react-router-dom";

import TurmasApi from "./turmas.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

class TurmasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turmas: []
    };
  }
  componentDidMount() {
    this.loadTurmas();
  }

  novaTurma(e) {
    e.preventDefault();
    this.props.history.push("/turmas/nova");
  }

  loadTurmas() {
    TurmasApi.loadTurmas().then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        turmas: res
      });
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h3>Turmas</h3>
          <button className="btn btn-success" onClick={e => this.novaTurma(e)}>
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2">Nova Turma</span>
          </button>
        </div>

        <div className="list-group mt-4">
          {this.state.turmas.map(turma => (
            <Link
              to={`/turmas/${turma._id}`}
              key={turma._id}
              className="list-group-item list-group-item-action"
            >
              {turma.nome}
            </Link>
          ))}

          {this.state.turmas.length === 0 && (
            <li className="list-group-item italico">
              Nenhuma turma encontrada.
            </li>
          )}
        </div>
      </div>
    );
  }
}

export default TurmasPage;
