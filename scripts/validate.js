//show input error for specific input inside form
function showInputError(formElement, inputElement, validationMessage, errorStyleClass) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.add(errorStyleClass);
  errorElement.textContent = validationMessage;
}

//hide input error for specific input inside form
function hideInputError(formElement, inputElement, errorStyleClass) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.remove(errorStyleClass);
  errorElement.textContent = '';
}


//validate inputs
function isValid(formElement, inputElement, errorStyleClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorStyleClass);
  }
  else {
    hideInputError(formElement, inputElement, errorStyleClass);
  }
}

function resetErrors(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config.errorStyleClass);
  });
  toggleButtonState(inputList, submitButtonElement, config.inactiveSubmitButtonClass);
}

//check for invalid inputs
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

//toggle button state
function toggleButtonState(inputList, buttonElement, inactiveSubmitButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveSubmitButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveSubmitButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
//set event listeners for form
function setFormEventListeners(formElement, config) {
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const errorStyleClass = config.errorStyleClass;
  const inactiveSubmitButtonClass = config.inactiveSubmitButtonClass;

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, errorStyleClass);
      toggleButtonState(inputList, submitButtonElement, inactiveSubmitButtonClass);
    });
  });
}

//enable validation for forms
function enableValidation(config) {
  const formElements = Array.from(document.querySelectorAll(config.formSelector));
  formElements.forEach(formElement => {
    setFormEventListeners(formElement, config);
  });
}