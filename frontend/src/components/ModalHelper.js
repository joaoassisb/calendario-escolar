import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCircleNotch from "@fortawesome/fontawesome-free-solid/faCircleNotch";

if (typeof document !== "undefined") {
  Modal.setAppElement("#root");
}

export class ModalHelper extends Component {
  componentDidUpdate(oldProps) {
    if (this.props.isOpen !== oldProps.isOpen) {
      document.querySelector("body").style.overflowY = this.props.isOpen
        ? "hidden"
        : "auto";
    }
  }

  close(e) {
    e.preventDefault();
    this.props.onClose();
  }

  success(e) {
    e.preventDefault();
    this.props.success();
  }

  renderFooter() {
    const { success, onCloseText, successText } = this.props;

    if (!success && !onCloseText) {
      return "";
    }

    return (
      <div className="modal-footer">
        <div className="d-flex justify-content-end">
          {onCloseText && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={this.close.bind(this)}
            >
              {onCloseText || "Não"}
            </button>
          )}

          {success && (
            <button
              type="button"
              className="btn btn-sm btn-success ml-2"
              onClick={this.success.bind(this)}
            >
              {successText || "Sim"}
            </button>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { isOpen, title, content, isLoading, size = "" } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.close.bind(this)}
        className={`Modal__Bootstrap modal-dialog modal-dialog-centered ${
          size ? `modal-${size}` : ""
        }`}
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <div className="modal-header">{title}</div>

          <div className="modal-body">
            {isLoading ? (
              <span className="mr-2">
                <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin />
              </span>
            ) : (
              content
            )}
          </div>

          {this.renderFooter()}
        </div>
      </Modal>
    );
  }
}

ModalHelper.propTypes = {
  title: PropTypes.string,
  onCloseText: PropTypes.string,
  successText: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  success: PropTypes.func
};
