import React from 'react'
import { connect } from 'react-redux'
import { alertError } from '../../Actions/alertActions'
import {userValidations} from '../../Utils/userValidations'
import {createUser} from '../../Actions/userActions'
import { Link } from 'react-router-dom'

class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state = {userData: {first_name: "", last_name: "", email: "", 
      password: "", password_confirmation: ""},
     errors: {
        first_name: "", last_name: "", email: "", password: "", password_confirmation: ""
      }};
  }

  componentDidMount(){
    if (this.props.user){
      this.props.alertError("You have already logged in");
      this.props.history.push("/");
    }
  }

  stateErrorModifier = (id, message) => {
    //console.log(id, message);
    this.setState({errors: {...this.state.errors, [id]: message}})
  }

  handleChange = (e) => {
    this.setState({userData: {...this.state.userData, [e.target.id]: e.target.value}})
    userValidations[e.target.id](e.target, this.stateErrorModifier);
    if (!userValidations.isAllValid()){
      document.getElementById('btn_submit').setAttribute("disabled", true);
    }
    else{
      document.getElementById('btn_submit').removeAttribute("disabled");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createUser(this.state.userData);
  }
  
  render(){
    return (
      <div className="row container">
        <div className="col s12 m10 l8 offset-l2 offset-m1">
          <h3 className="blue-grey-text">Sign-up</h3><hr />
          <form onSubmit={this.handleSubmit}>
            <div className="row m-b-0">
              <div className="input-field col s6">
                <input type="text" id="first_name" required onChange={this.handleChange} />
                <label htmlFor="first_name">First Name</label>
                <span className="helper-text" data-error={this.state.errors.first_name}></span>
              </div>
              <div className="input-field col s6">
                <input type="text" id="last_name" required onChange={this.handleChange} />
                <label htmlFor="last_name">Last Name</label>
                <span className="helper-text" data-error={this.state.errors.last_name}></span>
              </div>
            </div>
            <div className="input-field">
              <input type="email" id="email" required onChange={this.handleChange} />
              <label htmlFor="email">Email</label>
              <span className="helper-text" data-error={this.state.errors.email}></span>
            </div>
            <div className="input-field">
              <input type="password" id="password" required onChange={this.handleChange} />
              <label htmlFor="password">Password</label>
              <p className="small-light">Minimum Password Requirement: Min. length 6, Include Atleat one uppercase, lowercase and numeric charecter</p>
              <span className="helper-text" data-error={this.state.errors.password}></span>
            </div>
            <div className="input-field">
              <input type="password" id="password_confirmation" required onChange={this.handleChange} />
              <label htmlFor="password_confirmation">Confirm Password</label>
              <span className="helper-text" data-error={this.state.errors.password_confirmation}></span>
            </div>

            <input type="submit" className="btn green" value="Sign-up" id="btn_submit" />
            <input type="reset" className="btn orange m-l-1rem" />
          </form>
          <Link to="/login">Already hava an account? Login Here</Link>
        </div>
      </div> 
    );   
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  alertError: (message) => (dispatch(alertError([message]))),
  createUser: (data) => (dispatch(createUser(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);