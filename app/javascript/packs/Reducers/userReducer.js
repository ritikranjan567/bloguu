import { SET_USER, RESET_USER } from "../Actions/actionTypes"
let user = localStorage.getItem('user')
const initState = JSON.parse(user)

export const userReducer = (state = initState, action) => {
  switch(action.type){
    case SET_USER:
      return {
        ...action.user
      }
    case RESET_USER:
      return null;
    default:
      return state;
  }
}