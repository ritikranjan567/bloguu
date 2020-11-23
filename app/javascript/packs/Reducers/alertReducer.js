import {SUCCESS, ERROR, CLEAR} from '../Actions/actionTypes'
const initState = {
  color: "",
  messages: []
}


const alertReducer = (state = initState, action) => {
  switch(action.type) {
    case SUCCESS:
      return {
        color: "green lighten-2",
        messages: state.messages.concat([action.message])
      };
    case ERROR:
      return {
        color: "red lighten-2",
        messages: state.messages.concat(action.messages)
      };
    case CLEAR:
      return initState;
    default:
      return state;
  }
}

export default alertReducer;