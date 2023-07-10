import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._imageTitle = this._popupElement.querySelector('.popup__title');
  }

  open(title, link) {
    super.open();

    this._image.src = link;
    this._image.alt = title;
    this._imageTitle.innerText = title;
  }
}