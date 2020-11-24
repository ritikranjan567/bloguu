import { userValidations } from "./userValidations"
import { dummy, isAllValid } from "./validationSupport"

let editPasswordCheckList = {
  password: false,
  password_confirmation: false
}

export const editPasswordValidation = {
  password: (element, setErrorState = dummy) => userValidations.password(element, setErrorState, editPasswordCheckList),
  password_confirmation: (element, setErrorState = dummy) => userValidations.password_confirmation(element, setErrorState, editPasswordCheckList),
  isAllValid: () => isAllValid(editPasswordCheckList)
}