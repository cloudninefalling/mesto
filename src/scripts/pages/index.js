import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import '../../pages/index.css'
//    --- constants ---

//query selector for page elements
const page = document.querySelector('.page');

//query selectors for profile elements
const profile = page.querySelector('.profile');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button')
const profileInfo = profile.querySelector('.profile-info');
const buttonOpenEditProfilePopup = profileInfo.querySelector('.profile-info__edit-button');

//validation config
const config = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__text',
  submitButtonSelector: '.edit-form__submit',
  inactiveSubmitButtonClass: 'edit-form__submit_disabled',
  errorMessageSelector: 'edit-form__input-error-msg',
  errorStyleClass: 'edit-form__text_error'
};

// --- initial setup ---

const popupWithImage = new PopupWithImage('.popup_image');

popupWithImage.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#element-template', popupWithImage.open.bind(popupWithImage));
      const cardElement = card.generate();
      cardSection.addItem(cardElement);
    }
  },
  '.elements'
);
cardSection.renderItems();

const userInfo = new UserInfo('.profile-info__name', '.profile-info__occupation');

const popupAddCardForm = new PopupWithForm(
  '.popup_add-card',
  (inputValues) => {
    const data = {
      name: inputValues['input-image-name'],
      link: inputValues['input-image-link']
    }
    const card = new Card(data, '#element-template', popupWithImage.open.bind(popupWithImage))
    const cardElement = card.generate();
    cardSection._container.prepend(cardElement);
    popupAddCardForm.close();
  }
);
popupAddCardForm.setEventListeners();

const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  (inputValues) => {
    userInfo.setUserInfo(inputValues['input-name'], inputValues['input-occupation']);
    popupEditProfileForm.close();
  }
);
popupEditProfileForm.setEventListeners();

const popupEditProfile = page.querySelector('.popup_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const popupAddCard = page.querySelector('.popup_add-card');
const formAddCard = popupAddCard.querySelector('.edit-form');
const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

buttonOpenEditProfilePopup.addEventListener('click', () => {
  popupEditProfileForm.open();
  popupEditProfileForm.setInputValues(Object.values(userInfo.getUserInfo()))
  formEditProfileValidator.resetErrors();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAddCardForm.open();
  popupAddCardForm.setInputValues();
  formAddCardValidator.resetErrors();
});