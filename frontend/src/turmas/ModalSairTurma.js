import React, { Component } from "react";
import { ModalHelper } from "../components/ModalHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSignIn from "@fortawesome/fontawesome-free-solid/faSignInAlt";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faSignOutAlt from "@fortawesome/fontawesome-free-solid/faSignOutAlt";

import TurmasApi from "../turmas/turmas.api";

export class ModalSairTurma extends Component {
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

  sairTurma() {
    this.setState({
      isLoading: true
    });

    TurmasApi.sair(this.props.turma._id, {
      aluno: this.props.aluno
    })
      .then(res => {
        this.toggleModal();
        return this.props.reloadData();
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
    return <div>Deseja mesmo sair da turma {this.props.turma.nome}?</div>;
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-danger"
          onClick={this.toggleModal.bind(this)}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>

        <ModalHelper
          isOpen={this.state.modalIsOpen}
          success={this.sairTurma.bind(this)}
          successText="Sair da turma"
          onClose={this.toggleModal.bind(this)}
          onCloseText="Fechar"
          content={this.renderFormulario()}
          title={<h2>Confirmação</h2>}
          size="lg"
        />
      </React.Fragment>
    );
  }
}
