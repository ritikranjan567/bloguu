import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertSuccess } from '../../Actions/alertActions'
import {resetUser} from '../../Actions/userActions'

const SignedInNav = (props) => {
  //console.log(props.user);
  return (
    <Fragment>
      <li className="sidenav-close">
        <Link className="btn waves-effect waves-light pulse" to="/create-post" >
          <i className="material-icons left">add</i>
          POST
        </Link>
      </li>
      <li className="sidenav-close">
        <Link to="/" className="waves-effect waves-light" onClick={() => handleLogout(props.alertSuccess, props.resetUser)} >Logout</Link>
      </li>
      <li>
        <Link to="/" className="user-initials" >
          <div className="circle pink lighten-2 center user-initials" >{userInitials(props.user.attributes)}</div>
        </Link>
      </li>

      
    </Fragment>
  );
}

function handleLogout(alertSuccess, resetUser){
  resetUser();
  alertSuccess("You have been successfully logged out");
}

function userInitials(user_attributes){
  return (user_attributes) ? (user_attributes.first_name[0] + user_attributes.last_name[0]): null 
}


const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  alertSuccess: (message) => (dispatch(alertSuccess(message))),
  resetUser: () => (dispatch(resetUser()))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignedInNav);