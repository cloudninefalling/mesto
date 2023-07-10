export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._handleClickClose = this._handleClickClose.bind(this)
    this._popupElement.addEventListener('mousedown', this._handleClickClose);
    this._handleEscClose = this._handleEscClose.bind(this)
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');

    this._popupElement.removeEventListener('mousedown', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('mousedown', this.close.bind(this));
  }
}