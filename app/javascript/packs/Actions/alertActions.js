import {SUCCESS, ERROR, CLEAR} from './actionTypes'

export const alertSuccess = (message) => {
  return (dispatch) => {
    dispatch(clearAlert())
    dispatch({type: SUCCESS, message})
    setTimeout(() => dispatch({type: CLEAR}), 4000)
  }
}

export const alertError = (messages) => {
  return (dispatch, getState) => {
    dispatch(clearAlert())
    dispatch({type: ERROR, messages})
    setTimeout(() => dispatch({type: CLEAR}), 4000)
  }
}

export const clearAlert = () => {
  return dispatch => (
    dispatch({type: CLEAR})
  )
}