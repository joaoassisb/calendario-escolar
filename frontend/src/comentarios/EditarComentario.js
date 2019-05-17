import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faSave from "@fortawesome/fontawesome-free-solid/faSave";
import ComentarioApi from "./ComentarioApi";

export class EditarComentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exibirForm: false,
      comentario: props.comentario.texto || ""
    };
  }

  salvarComentario(e) {
    e.preventDefault();
    e.stopPropagation();

    const comentario = {
      texto: this.state.comentario,
      evento: this.props.eventoId,
      data: Date.now()
    };

    return ComentarioApi.saveComentario(
      this.props.comentario._id,
      comentario
    ).then(() => {
      this.props.aoSalvar();
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  toggleExibicaoForm() {
    this.setState({
      exibirForm: !this.state.exibirForm
    });
  }

  render() {
    return this.state.exibirForm || this.props.comentario._id ? (
      <form onSubmit={e => this.salvarComentario(e)} className="form">
        <div className="form-group">
          <textarea
            name="comentario"
            value={this.state.comentario}
            onChange={e => this.handleChange(e)}
            required
            className="form-control"
            rows={5}
          />
        </div>
        <div className="text-center mb-4">
          <button
            className="btn btn-danger mr-2"
            type="submit"
            onClick={this.toggleExibicaoForm.bind(this)}
          >
            <FontAwesomeIcon icon={faTrash} fixedWidth className="mr-1" />
            Cancelar
          </button>
          <button className="btn btn-success" type="submit">
            <FontAwesomeIcon icon={faSave} fixedWidth className="mr-1" />
            Salvar
          </button>
        </div>
      </form>
    ) : (
      <div className="text-right">
        <button
          className="btn btn-info"
          onClick={this.toggleExibicaoForm.bind(this)}
        >
          <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1" />
          Novo comentário
        </button>
      </div>
    );
  }
}
