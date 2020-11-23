export function isAllValid(checkList){
  for (const props in checkList){
    if (!checkList[props]){
      return false;
    }
  }
  return true;
}

export function dummy(id, message){
  console.log(id, message);
}