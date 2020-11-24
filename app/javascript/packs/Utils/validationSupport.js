export function isAllValid(checkList){
  for (const props in checkList){
    if (!checkList[props]){
      return false;
    }
  }
  return true;
}

export function setAndStyleValid(element, checkList) {
  element.classList.remove('invalid');
  element.classList.add('valid');
  checkList[element.id] = true;
}

export function setAndStyleInvalid(element, checkList){
  element.classList.remove('valid');
  element.classList.add('invalid');
  checkList[element.id] = false;
}

export function dummy(id, message){
  console.log(id, message);
}