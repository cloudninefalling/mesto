export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveSubmitButtonClass = config.inactiveSubmitButtonClass;
    this._errorMessageSelector = config.errorMessageSelector;
    this._errorStyleClass = config.errorStyleClass;

    this._formElement = formElement;
  }

  //show input error for specific input inside form
  _showInputError(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.add(this._errorStyleClass);
    errorElement.textContent = validationMessage;
  }

  //hide input error for specific input inside form
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.remove(this._errorStyleClass);
    errorElement.textContent = '';
  }

  //validate inputs
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  //check for invalid inputs
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //toggle button state
  _toggleButtonState(inputList, buttonElement, inactiveSubmitButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveSubmitButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveSubmitButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //set event listeners for form
  _setFormEventListeners() {
    const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const inactiveSubmitButtonClass = this._inactiveSubmitButtonClass;

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, submitButtonElement, inactiveSubmitButtonClass);
      });
    });
  }

  resetErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList, submitButtonElement);
  }

  //enable validation for forms
  enableValidation() {
    this._setFormEventListeners();
  }
}
