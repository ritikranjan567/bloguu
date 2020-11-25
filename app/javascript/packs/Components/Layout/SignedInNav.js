import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertSuccess } from '../../Actions/alertActions'
import {deleteUser, destroyUserSession} from '../../Actions/userActions'
import { customizeConfirmationModal } from '../../Actions/confirmationModalActions'

const SignedInNav = (props) => {

  function handleDeleteProfile (){
    props.customizeConfirmationModal('Are you sure to delete your profile?', 
    'Yes, I am', "No, I ain't", onAgreement, onDisagreement);
    let modalInstance = M.Modal.init(document.getElementById('confirmation-modal'), {opacity: 0, startingTop: '70%'});
    modalInstance.open();
  }

  function onAgreement() {
    props.deleteUser();
  }

  function onDisagreement() {
    return;
  }
  return (
    <div>
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
          <div className="user-initials circle pink lighten-2 center user-initials dropdown-trigger" 
            data-target="user-container" onClick={handleShowUser}>
            {userInitials(props.user.attributes)}
          </div>
      </li>
      
      <div className="card red darken-4 dropdown-content" id="user-container">
        <div className="card-content">
          <span className="card-title">
            {props.user.attributes.first_name + " " + props.user.attributes.last_name}
          </span>
          <p className="email">{props.user.attributes.email}</p>
        </div>
        <div className="card-action">
          <Link to="/edit-user" className="flex-content sidenav-close"><i className="material-icons">edit</i> &nbsp; Edit Profile</Link>
          <Link to="/change-password" className="flex-content sidenav-close"><i className="material-icons">vpn_key</i> &nbsp; Change Password</Link>
          <a href="#" data-target="confirmation-modal" className="flex-content sidenav-close modal-trigger" onClick={handleDeleteProfile}><i className="material-icons">delete</i>Delete Proflie</a>
        </div>
      </div>
      
    </div>
  );
}

function handleShowUser(e){
  let instance = M.Dropdown.init(e.target);
  instance.recalculateDimensions();
  instance.open();
  //console.log(instance);
}

function handleLogout(alertSuccess, resetUser){
  resetUser();
  alertSuccess("You have been successfully logged out");
}

function userInitials(user_attributes){
  return (user_attributes) ? (user_attributes.first_name[0] + user_attributes.last_name[0]): null 
}


const mapStateToProps = (state) => ({
  user: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  alertSuccess: (message) => (dispatch(alertSuccess(message))),
  resetUser: () => (dispatch(destroyUserSession())),
  customizeConfirmationModal: (message, buttonAffermative, buttonNegative, onAgreement, onDisagreement) =>
  (dispatch(customizeConfirmationModal(message, buttonAffermative, buttonNegative, onAgreement, onDisagreement))),
  deleteUser: () => (dispatch(deleteUser())),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignedInNav);