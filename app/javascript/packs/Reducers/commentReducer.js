import { SET_COMMENTS } from "../Actions/actionTypes";

const initState = {
  comment: {},
  comments: []
}

export const commentReducer = (state = initState, action) => {
  switch(action.type){
    case SET_COMMENTS:
      return {
        ...state, comments: action.comments
      }
    default:
      return state;
  }
}