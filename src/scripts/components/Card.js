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

  _likeElement(evtTarget) {
    evtTarget.classList.toggle('element__like_active');
  }

  _deleteElement(evtTarget) {
    evtTarget.closest('.element').remove();
  }

  generate() {
    const card = this._getTemplate();

    //assign cardfields
    const cardTitleElement = card.querySelector('.element__title');
    const cardImageElement = card.querySelector('.element__image');

    //set card field values
    cardTitleElement.textContent = this._title;
    cardImageElement.src = this._image;
    cardImageElement.alt = this._title;

    card.addEventListener('click', evt => {
      const evtTarget = evt.target;
      const evtTargetClassList = evtTarget.classList;

      if (evtTargetClassList.contains('element__like')) {
        this._likeElement(evtTarget);
      } else if (evtTargetClassList.contains('element__delete')) {
        this._deleteElement(evtTarget)
      } else if (evtTargetClassList.contains('element__image')) {
        this._openPopup(this._title, this._image);
      };
    });

    return card;
  }
}