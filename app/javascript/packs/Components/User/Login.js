import React from 'react'
import { setUser } from '../../Actions/userActions'
import { alertError } from '../../Actions/alertActions'
import { connect } from 'react-redux'

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {email: "", password: ""};
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = (e) => {
    //console.log("here");
    e.preventDefault();
    let data = this.state
    this.props.setUser(data);
    //console.log(history.state.state.from.pathname);
  }

  componentDidMount(){
    if (this.props.user){
      this.props.alertError("You have already logged in");
      this.props.history.push("/")
    }
  }

  render(){
    return(
      <div className="row container">
        <div className="col s12 m10 l8 offset-l2 offset-m1">
          <h3 className="blue-grey-text">Login</h3><hr />
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input type="email" id="email" className="validate" required onChange={this.handleChange} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input type="password" id="password" className="validate" required onChange={this.handleChange} />
              <label htmlFor="password">Password</label>
            </div>

            <input type="submit" className="btn green lighten-1" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => (dispatch(setUser(data))),
  alertError: (message) => (dispatch(alertError([message])))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);