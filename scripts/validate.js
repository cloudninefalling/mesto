//show input error for specific input inside form
function showInputError(formElement, inputElement, validationMessage) {
  errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.add('edit-form__text_error');
  errorElement.textContent = validationMessage;
}

//hide input error for specific input inside form
function hideInputError(formElement, inputElement) {
  errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.remove('edit-form__text_error');
  errorElement.textContent = '';
}


//validate inputs
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  }
}

//check for invalid inputs
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

//toggle button state
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('edit-form__submit_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('edit-form__submit_disabled');
    buttonElement.removeAttribute('disabled');
  }
}
//set event listeners for form
function setFormEventListeners(formElement) {
  const buttonElement = formElement.querySelector('.edit-form__submit');
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__text'))
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//enable validation for all forms on page
function enableValidation() {
  formsList = Array.from(document.forms);

  formsList.forEach(formElement => {
    setFormEventListeners(formElement);
  });
}