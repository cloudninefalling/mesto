export class Card {
  constructor(data, template, openPopup) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _likeElement(evt) {
    console.log(evt)
    evt.target.classList.toggle('element__like_active');
  }

  _deleteElement(evt) {
    evt.target.closest('.element').remove();
  }

  generate() {
    const card = this._getTemplate();

    //assign cardfields
    this._titleElement = card.querySelector('.element__title');
    this._imageElement = card.querySelector('.element__image');
    this._likeButton = card.querySelector('.element__like');
    this._deleteButton = card.querySelector('.element__delete');

    //set card field values
    this._titleElement.textContent = this._title;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;

    this._likeButton.addEventListener('click', this._likeElement);
    this._deleteButton.addEventListener('click', this._deleteElement);
    this._imageElement.addEventListener('click', evt => {
      this._openPopup(this._title, this._image);
    });

    return card;
  }
}