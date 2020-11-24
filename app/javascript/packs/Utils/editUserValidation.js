import {isAllValid, dummy} from './validationSupport'
import {userValidations} from './userValidations' 

let editUserCheckList = {
  first_name: true,
  last_name: true,
  email: true
}

export const editUserValidation = {
  first_name: (element, setErrorState = dummy) => userValidations.first_name(element, setErrorState, editUserCheckList),
  last_name: (element, setErrorState = dummy) => userValidations.last_name(element, setErrorState, editUserCheckList),
  email: (element, setErrorState = dummy) => userValidations.email(element, setErrorState, editUserCheckList),
  isAllValid: () => isAllValid(editUserCheckList)
}