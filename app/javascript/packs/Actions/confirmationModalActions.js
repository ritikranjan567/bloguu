import { CUSTOMIZE_CONFIRMATION_MODAL } from "./actionTypes"

export const customizeConfirmationModal = (message, buttonAffermative, buttonNegative, onAgreement, onDisagreement) => {
  return dispatch => {
    dispatch({type: CUSTOMIZE_CONFIRMATION_MODAL, message, buttonAffermative, buttonNegative, onAgreement, onDisagreement})
  }
}