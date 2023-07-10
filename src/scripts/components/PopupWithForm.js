import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._formElement = this._popupElement.querySelector('.edit-form');
    this._inputs = Array.from(this._formElement.querySelectorAll('input'));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(values) {
    if (values) {
      this._inputs.forEach(input => {
        input.value = values[input.name]
      })
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submit(inputValues)
    });
  }
}