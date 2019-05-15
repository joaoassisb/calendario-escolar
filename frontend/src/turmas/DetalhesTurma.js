import React, { Component } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import { ModalHelper } from "../components/ModalHelper";
import EventosTurma from "../eventos/EventosTurma";
import { buildDateString } from "../components/formatters";

import TurmasApi from "./turmas.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

class TurmasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turma: {},
      date: new Date(),
      modalIsOpen: false
    };
  }
  componentDidMount() {
    this.loadTurma();
  }

  loadTurma() {
    this.setState({
      isLoading: true
    });

    const { id } = this.props.match.params;

    TurmasApi.loadTurma(id).then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        turma: res,
        isLoading: false
      });
    });
  }

  toggleModal(date) {
    this.setState({
      ...this.state,
      modalIsOpen: !this.state.modalIsOpen,
      date
    });
  }

  render() {
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
      <div className="container mt-4 detalhes-turma">
        <div className="d-flex justify-content-between">
          <Link to="/turmas">
            <h3>
              <FontAwesomeIcon icon={faChevronLeft} />
            </h3>
          </Link>

          <h3>Turma {this.state.turma.nome}</h3>

          <Link to={`/turmas/${this.state.turma._id}/editar`}>
            <button className="btn btn-success">
              <FontAwesomeIcon icon={faEdit} />
              <span className="ml-2">Editar Turma</span>
            </button>
          </Link>
        </div>

        <div className="calendario my-4">
          <Calendar
            onChange={this.toggleModal.bind(this)}
            value={this.state.date}
          />
        </div>

        <ModalHelper
          isOpen={this.state.modalIsOpen}
          onClose={this.toggleModal.bind(this)}
          onCloseText="Fechar"
          content={
            <EventosTurma data={this.state.date} turma={this.state.turma._id} />
          }
          title={
            <React.Fragment>
              <h1 className="h2 mb-0">
                {moment(this.state.date).format("DD/MM/YYYY")}
              </h1>
              <Link
                to={`/turmas/${
                  this.state.turma._id
                }/eventos/novo?data=${buildDateString(this.state.date)}`}
              >
                <button className="btn btn-success">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Link>
            </React.Fragment>
          }
          size="lg"
        />
      </div>
    );
  }
}

export default TurmasPage;
