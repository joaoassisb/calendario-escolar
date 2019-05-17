import React, { Component } from "react";
import { ModalHelper } from "../components/ModalHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";

import TurmasApi from "../turmas/turmas.api";

export class ModalDeletarTurma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  excluirTurma() {
    this.setState({
      isLoading: true
    });

    TurmasApi.deleteTurma(this.props.turma._id)
      .then(res => {
        this.toggleModal();
        return this.props.reloadData();
      })
      .catch(err => {
        let error = "Ocorreu um erro, tente novamente mais tarde!";
        if (
          err.message.match(
            /Turma não pode ser excluída porque possui eventos cadastrados/
          )
        ) {
          error =
            "Turma não pode ser excluída porque possui eventos cadastrados.";
        }

        this.setState({
          error,
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
      <div>
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
        Deseja mesmo excluir a turma {this.props.turma.nome}? Essa ação não
        poderá ser desfeita.
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-danger mr-2 mb-2"
          onClick={this.toggleModal.bind(this)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <ModalHelper
          isOpen={this.state.modalIsOpen}
          success={this.excluirTurma.bind(this)}
          successText="Excluir"
          onClose={this.toggleModal.bind(this)}
          onCloseText="Fechar"
          content={this.renderFormulario()}
          title={<h2>Confirmação de exclusão</h2>}
          size="lg"
        />
      </React.Fragment>
    );
  }
}
