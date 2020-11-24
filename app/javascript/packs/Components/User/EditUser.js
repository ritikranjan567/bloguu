import React from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../Actions/userActions';
import {editUserValidation} from '../../Utils/editUserValidation'

class EditUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: {
        first_name: this.props.user.attributes.first_name,
        last_name: this.props.user.attributes.last_name,
        email: this.props.user.attributes.email
      },
      errors: {
        first_name: "",
        last_name: "",
        email: ""
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      data: {...this.state.data, [e.target.id]: e.target.value}
    });
    editUserValidation[e.target.id](e.target, this.setStateError);
    (editUserValidation.isAllValid())? 
      document.getElementById('submit-trigger').removeAttribute('disabled') :
      document.getElementById('submit-trigger').setAttribute('disabled', true);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.state.data);
  }

  setStateError = (id, message) => {
    this.setState({
      errors: {...this.state.errors, [id]: message}
    });
  }

  render() {
    return (
      <div className="row container">
        <div className="col s12 m10 l8 offset-l2 offset-m1">
          <h3 className="blue-grey-text">Edit Profile</h3><hr />
          <form onSubmit={this.handleSubmit}>
          <div className="row m-b-0">
              <div className="input-field col s6">
                <input type="text" id="first_name" required onChange={this.handleChange} value={this.state.data.first_name} />
                <label htmlFor="first_name" className="active">First Name</label>
                <span className="helper-text" data-error={this.state.errors.first_name}></span>
              </div>
              <div className="input-field col s6">
                <input type="text" id="last_name" required onChange={this.handleChange} value={this.state.data.last_name} />
                <label htmlFor="last_name" className="active">Last Name</label>
                <span className="helper-text" data-error={this.state.errors.last_name}></span>
              </div>
            </div>
            <div className="input-field">
              <input type="email" id="email" required onChange={this.handleChange} value={this.state.data.email} />
              <label htmlFor="email" className="active">Email</label>
              <span className="helper-text" data-error={this.state.errors.email}></span>
            </div>

            <input type="submit" className="btn orange lighten-1" id="submit-trigger" value="Edit Profile" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => (dispatch(updateUser(data)))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
