import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//    --- constants ---
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//query selector for page elements
const page = document.querySelector('.page');

//query selector for template element
const cardTemplateSelector = '#element-template';

//query selector for card elements
const cardsContainer = page.querySelector('.elements');

//query selectors for profile elements
const profile = page.querySelector('.profile');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button')
const profileInfo = profile.querySelector('.profile-info');
const userName = profileInfo.querySelector('.profile-info__name');
const userOccupation = profileInfo.querySelector('.profile-info__occupation');
const buttonOpenEditProfilePopup = profileInfo.querySelector('.profile-info__edit-button');

//query selectors for popup elements
const popupEditProfile = page.querySelector('.popup_edit-profile');
const popupAddCard = page.querySelector('.popup_add-card');

const closeButtons = page.querySelectorAll('.popup__close');

//validation config
const config = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__text',
  submitButtonSelector: '.edit-form__submit',
  inactiveSubmitButtonClass: 'edit-form__submit_disabled',
  errorMessageSelector: 'edit-form__input-error-msg',
  errorStyleClass: 'edit-form__text_error'
};

//query selectors for formEditProfile elements
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const formEditProfileValidator = new FormValidator(config, formEditProfile);
const inputName = formEditProfile.querySelector('.edit-form__text_input_profile-name');
const inputOccupation = formEditProfile.querySelector('.edit-form__text_input_profile-occupation');

//query selectors for formAddCard elements
const formAddCard = popupAddCard.querySelector('.edit-form');
const formAddCardValidator = new FormValidator(config, formAddCard);
const inputImageName = formAddCard.querySelector('.edit-form__text_input_image-name');
const inputImageLink = formAddCard.querySelector('.edit-form__text_input_image-link');

//    --- functions ---

function openPopup(popup) {
  popup.classList.add('popup_opened');

  //add event listener to close popup on 'esc'
  document.addEventListener('keydown', closePopupOnEsc);
  //add event listener to close popup on click on overlay
  document.addEventListener('mousedown', closePopupOnClick);
}

function setupFormEditProfile() {
  //set input values to current profile info
  inputName.value = userName.textContent;
  inputOccupation.value = userOccupation.textContent;
  //focus on input
  inputName.focus();
  formEditProfileValidator.resetErrors();
}

//submit edit-form: update profile info and close popup 
function submitFormEditProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  closePopup(popupEditProfile);
}

function setupFormAddCard() {
  //reset form
  formAddCard.reset();
  //focus on input
  inputImageName.focus();
  //reset errors
  formAddCardValidator.resetErrors();
}

//submit add-form: add image and close popup
function submitFormAddCard(evt) {
  evt.preventDefault();
  const data = {
    name: inputImageName.value,
    link: inputImageLink.value
  }
  const card = new Card(data, cardTemplateSelector, openPopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
}

const closePopupOnEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//close popup by clicking on overlay
const closePopupOnClick = evt => {
  const evtTarget = evt.target;
  if (evtTarget.classList.contains('popup')) {
    closePopup(evtTarget);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('mousedown', closePopupOnClick);
}

function renderInitialCards() {
  initialCards.forEach(data => {
    const card = new Card(data, cardTemplateSelector, openPopup);
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  })
}

// --- initial setup ---

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

renderInitialCards();

//add submit listeners for forms
formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);

//add click listeners for open-popup-buttons
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupEditProfile);
  setupFormEditProfile();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
  setupFormAddCard();
});

//add event listeners for close-popup-buttons
closeButtons.forEach(button => button.addEventListener('click', evt => {
  closePopup(evt.target.closest('.popup'));
}));