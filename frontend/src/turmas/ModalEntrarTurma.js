import React, { Component } from "react";
import { ModalHelper } from "../components/ModalHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSignIn from "@fortawesome/fontawesome-free-solid/faSignInAlt";
import TurmasApi from "../turmas/turmas.api";

export class ModalEntrarTurma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      codigo: ""
    };
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleChange({ target }) {
    this.setState({
      ...this.state.turma,
      [target.name]: target.value
    });
  }

  entrarTurma(e) {
    e.preventDefault();
    e.stopPropagation();

    TurmasApi.entrarTurma(this.state)
      .then(res => {
        console.log(res);
        this.toggleModal();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  renderFormulario() {
    return (
      <form onSubmit={e => this.entrarTurma(e)} className="form ">
        <label htmlFor="codigo">Código</label>
        <div className="input-group mb-3">
          <input
            id="codigo"
            type="text"
            name="codigo"
            placeholder="Digite o código da turma"
            value={this.state.codigo}
            onChange={e => this.handleChange(e)}
            className="form-control"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="submit">
              <FontAwesomeIcon icon={faSignIn} />
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-primary"
          onClick={this.toggleModal.bind(this)}
        >
          <FontAwesomeIcon icon={faSignIn} />
          <span className="ml-2">Entrar em uma Turma</span>
        </button>
        <ModalHelper
          isOpen={this.state.modalIsOpen}
          onClose={this.toggleModal.bind(this)}
          onCloseText="Fechar"
          content={this.renderFormulario()}
          title={<h2>Entrar em uma turma</h2>}
          size="lg"
        />
      </React.Fragment>
    );
  }
}
