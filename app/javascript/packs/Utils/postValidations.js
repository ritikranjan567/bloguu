import {dummy, isAllValid, setAndStyleInvalid, setAndStyleValid} from './validationSupport'

let checkList = {
  title: false,
  content: false,
}

export const postValidations = (() => {
  const _title = (element, setStateError = dummy) => {
    if (element.value.length > 50){
      setAndStyleInvalid(element, checkList);
      setStateError(element.id, 'Title is too long (max 50 charecters)');
    }
    else if (element.value.length === 0){
      setAndStyleInvalid(element, checkList);
      setStateError(element.id, "Please don't leave the title empty");
    }
    else if (element.value.startsWith(' ')){
      setAndStyleInvalid(element, checkList);
      setStateError(element.id, "Please don't start with space");
    }
    else {
      setAndStyleValid(element, checkList);
      setStateError(element.id, '');
    }
  }

  const _content = (element, setStateError = dummy) => {
    if (element.value.length < 20){
      setAndStyleInvalid(element, checkList);
      setStateError(element.id, 'The content of your post is too short (min 20 charecters)');
    }
    else if (element.value.length > 1500){
      setAndStyleInvalid(element, checkList);
      setStateError(element.id, 'The content of your post is too big (max 2000 charecters)');
    }
    else if (element.value.startsWith(' ')){
      setAndStyleInvalid(element, checkList);
      setStateError(element.id, "Please don't start with space");
    }
    else{
      setAndStyleValid(element, checkList);
      setStateError(element.id, '');
    }

  }

  let _setCheckListAllValid = () => {
    for (const props in checkList){
      checkList[props] = true
    }
  }

  return {
    title: _title,
    content: _content,
    isAllValid: () => isAllValid(checkList),
    setCheckListAllValid: _setCheckListAllValid
  }
})(); 