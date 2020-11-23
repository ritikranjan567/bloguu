import {isAllValid, dummy} from './validationSupport'
let checkList = {
  first_name: false,
  last_name: false,
  email: false,
  password: false,
  password_confirmation: false
};

/* const invalidMessages = {
  first_name: {length: "Please fill your first name", formate: "Invalid name formate used for first name"},
  last_name: {length: "Please fill your last name", formate: "Invalid name formate used for last name"},
  email: {length: "Please fill your email address", formate: "Entered email formate is not recognized"},
  password: {length: "Password must be atleast 6 charecters", strength: "Your password is too weak. Follow instructions"},
  password_confirmation: {confirm: "Confirmation password must be same as password"}
} */

function setAndStyleValid(element) {
  element.classList.remove('invalid');
  element.classList.add('valid');
  checkList[element.id] = true;
}

function setAndStyleInvalid(element){
  element.classList.remove('valid');
  element.classList.add('invalid');
  checkList[element.id] = false;
}

export const userValidations = (() => {
  let _firstName = (element, setErrorState = dummy) => {
    if (element.value.length === 0){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Please fill your first name");
    }
    else if (!(/[A-Z][a-z]*\s*$/.test(element.value))){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Invalid name formate used for first name");
    }
    else{
      setAndStyleValid(element);
      setErrorState(element.id, "");
    }
  }

  let _lastName = (element, setErrorState) => {
    if (element.value.length === 0){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Please fill your last name");
    }
    else if (!(/[A-Z][a-z]*\s*$/.test(element.value))){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Invalid name formate used for last name");
    }
    else{
      setAndStyleValid(element);
      setErrorState(element.id, "");
    }
  }

  let _email = (element,setErrorState) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (element.value.length === 0){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Please provide your email id");
    }
    else if (!re.test(element.value)){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Entered email formate is not recognized");
    }
    else{
      setAndStyleValid(element);
      setErrorState(element.id, "");
    }
  }

  let _password = (element, setErrorState) => {
    let {value} = element;

    if (value.length < 6){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Password is too short");
    }
    else if (!(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(value))){
      setAndStyleInvalid(element);
      setErrorState(element.id, "Password is yet to fullfill minimum strength requirement");
    }
    else{
      setAndStyleValid(element);
      setErrorState(element.id, "");
    }
  }

  let _password_confirmation = (element, setErrorState) => {
    let {value} = document.getElementById('password');
    if (element.value !== value){
      setAndStyleInvalid(element);
      setErrorState(element.id, "This field should have the same value as password");
    }
    else{
      setAndStyleValid(element);
      setErrorState(element.id, "");
    }
  }

  return {
    first_name: _firstName,
    last_name: _lastName,
    email: _email,
    password: _password,
    password_confirmation: _password_confirmation,
    isAllValid: () => isAllValid(checkList),
  };
})();