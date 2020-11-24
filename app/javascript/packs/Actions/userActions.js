import { SET_CURRENT_USER, RESET_CURRENT_USER } from './actionTypes'
import {alertSuccess, alertError} from './alertActions'
const axios = require('axios')
import {browseHistory} from '../Utils/browseHistory'
import { authHeader } from '../Utils/auth-header'

export const createUserSession = (data) => {
  return (dispatch) => {
    axios.post("/api/v1/sessions", data)
      .then(res => {
        dispatch(setCurrentUser(res.data.data));
        localStorage.setItem("token", res.data.meta.token);
        dispatch(alertSuccess("You have logged in successfully"));
        browseHistory.push(history.state.state? history.state.state.from.pathname : "/");
      })
      .catch(error => {
        console.error(error)
        dispatch(alertError(error.response.data.error));
        dispatch({type: RESET_CURRENT_USER});
      });
  }
}

export const createUser = (data) => {
  return (dispatch) => {
    axios.post("api/v1/users", data)
      .then(res => {
        dispatch(setCurrentUser(res.data.data));
        localStorage.setItem("token", res.data.meta.token);
        dispatch(alertSuccess("You have sign-up successfully"));
        browseHistory.push("/");
      })
      .catch(error => {
        dispatch(alertError(error.response.data.error));
        dispatch({type: RESET_CURRENT_USER});
      });
  };
}

export const updateUser = (data) => {
  return dispatch => {
    axios({
      method: 'put',
      url: '/api/v1/update-user',
      headers: authHeader(),
      data
    }).then(res => {
      dispatch(setCurrentUser(res.data.data));
      dispatch(alertSuccess('Your profile has been successfully updated'));
      browseHistory.push('/');
    }, error => {
      dispatch(alertError(error.response.data.error));
    });
  }
}

export const destroyUserSession = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({type: RESET_CURRENT_USER});
  }
}

export const setCurrentUser = (user) => {
  return dispatch => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({type: SET_CURRENT_USER, user});
  }
}

export const changePassword = (data) => {
  return dispatch => {
    axios({
      method: 'put',
      url: '/api/v1/change-password',
      headers: authHeader(),
      data
    }).then(res => {
      dispatch(alertSuccess('Password has been successfully changed'));
      browseHistory.push('/');
    }, error => {
      dispatch(alertError(error.response.data.error));
    });
  }
}

export const deleteUser = () => {
  return dispatch => {
    axios({
      method: 'delete',
      url: '/api/v1/delete-profile',
      headers: authHeader()
    }).then(res => {
      dispatch(destroyUserSession());
      dispatch(alertSuccess('Profile was deleted successfully'));
    }, error => {
      dispatch(alertError([error.response.data.error]));
    });
  }
}