import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(title, link) {
    super.open();

    const image = this._popupElement.querySelector('.popup__image');
    const imageTitle = this._popupElement.querySelector('.popup__title');

    image.src = link;
    image.alt = title;
    imageTitle.innerText = title;
  }
}