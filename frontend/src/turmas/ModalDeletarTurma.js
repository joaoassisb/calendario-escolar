import React, { Component } from "react";
import { ModalHelper } from "../components/ModalHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSignIn from "@fortawesome/fontawesome-free-solid/faSignInAlt";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import TurmasApi from "../turmas/turmas.api";

export class ModalEntrarTurma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      codigo: "",
      error: false,
      isLoading: false
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

    this.setState({
      isLoading: true
    });

    TurmasApi.entrarTurma({
      codigo: this.state.codigo
    })
      .then(res => {
        if (Object.keys(res).length > 0) {
          return this.toggleModal();
        }

        return this.setState({
          error: "Código de turma inválido!",
          modalIsOpen: true,
          isLoading: false,
          codigo: ""
        });
      })
      .catch(err => {
        this.setState({
          error: "Ocorreu um erro, tente novamente mais tarde!",
          modalIsOpen: true,
          isLoading: false,
          codigo: ""
        });
      });
  }

  fecharMsgErro() {
    this.setState({
      ...this.state,
      error: false
    });
  }

  renderFormulario() {
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
      <form onSubmit={e => this.entrarTurma(e)} className="form ">
        {this.state.error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {this.state.error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.fecharMsgErro.bind(this)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

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
