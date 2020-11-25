import React, { Component } from 'react'

class ConfirmationModal extends Component {

  constructor(props) {
    super(props);
  }

  handleAgreement = () => {
    this.props.onAgreement();
  }

  handleDisagreement = () => {
    this.props.onDisagreement();
  }

  render() {
    return (
      <div className="modal" id="confirmation-modal">
        <div className="modal-content">
          <h5>{this.props.message}</h5>
        </div>
        <div className="modal-footer">
          <a href="#" className="modal-close btn-flat" onClick={this.handleAgreement}>{this.props.buttonAffermative}</a>
          <a href="#" className="modal-close btn-flat" onClick={this.handleDisagreement}>{this.props.buttonNegative}</a>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
