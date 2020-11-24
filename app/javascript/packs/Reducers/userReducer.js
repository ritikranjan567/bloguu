import { SET_CURRENT_USER, RESET_CURRENT_USER } from "../Actions/actionTypes"
let user = localStorage.getItem('user')
const initState = {
  currentUser: JSON.parse(user),
  tempUser: {}
}

export const userReducer = (state = initState, action) => {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state, currentUser: action.user
      }
    case RESET_CURRENT_USER:
      return {
        ...state, currentUser: null
      }
    default:
      return state;
  }
}