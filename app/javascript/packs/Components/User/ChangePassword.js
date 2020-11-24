import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePassword } from '../../Actions/userActions';
import { editPasswordValidation } from '../../Utils/editPasswordValidation';

class ChangePassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: {
        old_password: "",
        password: "",
        password_confirmation: ""
      },
      errors: {
        password: "",
        password_confirmation: ""
      }
    }
  }

  setErrorState = (id, message) => {
    this.setState({errors: {...this.state.errors, [id]: message}})
  }

  handleChange = (e) => {
    this.setState({data: {...this.state.data, [e.target.id]: e.target.value}})
    if (e.target.id !== 'old_password'){
      editPasswordValidation[e.target.id](e.target, this.setErrorState);
      (editPasswordValidation.isAllValid()) ?
        document.getElementById('submit-trigger').removeAttribute('disabled') : 
        document.getElementById('submit-trigger').setAttribute('disabled', true);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.changePassword(this.state.data);
  }

  render() {
    return (
      <div className="row container">
        <div className="col s12 m10 l8 offset-l2 offset-m1">
          <h3>Change Password</h3><hr />
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input type="password" id="old_password" className="validate" required onChange={this.handleChange} />
              <label htmlFor="old_password"> Old Password </label>
            </div>

            <div className="input-field">
              <input type="password" id="password" required onChange={this.handleChange} />
              <label htmlFor="password">New Password</label>
              <p className="small-light">Minimum Password Requirement: Min. length 6, Include Atleat one uppercase, lowercase and numeric charecter</p>
              <span className="helper-text" data-error={this.state.errors.password}></span>
            </div>
            <div className="input-field">
              <input type="password" id="password_confirmation" required onChange={this.handleChange} />
              <label htmlFor="password_confirmation">Confirm Password</label>
              <span className="helper-text" data-error={this.state.errors.password_confirmation}></span>
            </div>

            <input type="submit" id="submit-trigger" className="btn orange lighten-1" value="Change Password" /> 
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  changePassword: (data) => (dispatch(changePassword(data)))
})

export default connect(null, mapDispatchToProps)(ChangePassword);
