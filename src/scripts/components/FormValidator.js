export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveSubmitButtonClass = config.inactiveSubmitButtonClass;
    this._errorMessageSelector = config.errorMessageSelector;
    this._errorStyleClass = config.errorStyleClass;
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
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //toggle button state
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._inactiveSubmitButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._inactiveSubmitButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  //set event listeners for form
  _setFormEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidationState() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  //enable validation for forms
  enableValidation() {
    this._setFormEventListeners();
  }
}
