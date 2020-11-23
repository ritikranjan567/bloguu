import {SET_COMMENTS} from './actionTypes'

export const setComments = (comments) => {
  return (dispatch) => {
    dispatch({type: SET_COMMENTS, comments});
  };
}