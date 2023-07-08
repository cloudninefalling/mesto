import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._inputs = Array.from(this._popupElement.querySelectorAll('input'));
  }

  _getInputValues() {
    const inputValues = {}
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(values) {
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].value = values[i];
    }
  }

  setEventListeners() {
    super.setEventListeners();
    const formElement = this._popupElement.querySelector('.edit-form');
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submit(inputValues)
    });
  }
}