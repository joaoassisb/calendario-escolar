import React, { Component } from "react";
import LogsEventosApi from "./LogsEventos.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";
import faUserCircle from "@fortawesome/fontawesome-free-solid/faUserCircle";

import { toShortDateTime } from "../components/formatters";

export class LogsEventos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    this.loadLogsEventos();
  }

  loadLogsEventos() {
    if (!this.props.turma) {
      return;
    }

    this.setState({
      isLoading: true
    });

    LogsEventosApi.loadLogs({
      turma: this.props.turma
    }).then(res => {
      if (!res) {
        return;
      }

      this.setState({
        ...this.state,
        logs: res,
        isLoading: false
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <h4 className="mr-2">
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin />
          </h4>
        </div>
      );
    }
    return (
      <div>
        {this.state.logs.length === 0 ? (
          <div className="italico ">Nenhum evento adicionado ainda.</div>
        ) : (
          this.state.logs.map(log => (
            <div className="media mt-2" key={log._id}>
              <div className="align-self-start mr-3">
                <FontAwesomeIcon icon={faUserCircle} size={"3x"} />
              </div>

              <div className="media-body">
                <div className="row mb-2 ml-2">
                  <h5 className="mb-0">{toShortDateTime(log.data)}</h5>
                </div>
                <p>{log.mensagem}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
