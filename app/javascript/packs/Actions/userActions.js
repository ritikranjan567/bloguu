import { SET_USER, RESET_USER } from './actionTypes'
import {alertSuccess, alertError} from './alertActions'
const axios = require('axios')
import {browseHistory} from '../Utils/browseHistory'

export const setUser = (data) => {
  return (dispatch) => {
    axios.post("/api/v1/sessions", data)
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.meta.token);
        dispatch(alertSuccess("You have logged in successfully"));
        dispatch({type: SET_USER, user: res.data.data});
        browseHistory.push(history.state.state? history.state.state.from.pathname : "/");
      })
      .catch(error => {
        console.error(error)
        dispatch(alertError(error.response.data.error));
        dispatch({type: RESET_USER});
      });
  }
}

export const createUser = (data) => {
  return (dispatch) => {
    axios.post("api/v1/users", data)
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.meta.token);
        dispatch(alertSuccess("You have sign-up successfully"));
        dispatch({type: SET_USER, user: res.data.data});
        browseHistory.push("/");
      })
      .catch(error => {
        dispatch(alertError(error.response.data.error));
        dispatch({type: RESET_USER});
      });
  };
}

export const resetUser = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({type: RESET_USER});
  }
}