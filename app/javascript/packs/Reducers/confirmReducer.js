import { CUSTOMIZE_CONFIRMATION_MODAL } from "../Actions/actionTypes";

const initState = {
  message: "Are you sure to do this?",
  buttonAffermative: "Agree",
  buttonNegative: "Disagree",
  onAgreement: () => {return;},
  onDisagreement: () => {return;}
}

export const confirmReducer = (state = initState, action) => {
  switch (action.type){
    case CUSTOMIZE_CONFIRMATION_MODAL:
      return {
        message: action.message,
        buttonAffermative: action.buttonAffermative,
        buttonNegative: action.buttonNegative,
        onAgreement: action.onAgreement,
        onDisagreement: action.onDisagreement
      }
    default:
      return state;
  }
}