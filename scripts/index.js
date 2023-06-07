//    --- constants ---

//query selector for page elements
const page = document.querySelector('.page');

//query selector for template element
const elememtTemplate = page.querySelector('#element-template').content;

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
const popupImage = page.querySelector('.popup_image');

const closeButtons = page.querySelectorAll('.popup__close');

//query selectors for formEditProfile elements
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const inputName = formEditProfile.querySelector('.edit-form__text_input_profile-name');
const inputOccupation = formEditProfile.querySelector('.edit-form__text_input_profile-occupation');
const btnSubmitEditProfile = formEditProfile.querySelector('.edit-form__submit');
const inputListEditProfile = Array.from(formEditProfile.querySelectorAll('.edit-form__text'));

//query selectors for formAddCard elements
const formAddCard = popupAddCard.querySelector('.edit-form');
const inputImageName = formAddCard.querySelector('.edit-form__text_input_image-name');
const inputImageLink = formAddCard.querySelector('.edit-form__text_input_image-link');
const btnSubmitAddCard = formAddCard.querySelector('.edit-form__submit');
const inputListAddCard = Array.from(formAddCard.querySelectorAll('.edit-form__text'));

//query selectors for image popup elements
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__title');

//validation config
const config = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__text',
  submitButtonSelector: '.edit-form__submit',
  inactiveSubmitButtonClass: 'edit-form__submit_disabled',
  errorMessageSelector: 'edit-form__input-error-msg',
  errorStyleClass: 'edit-form__text_error'
};

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
  //reset errors
  resetErrors(formEditProfile, config);
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
  resetErrors(formAddCard, config);
}

//add image and close popup
function submitFormAddCard(evt) {
  evt.preventDefault();
  const card = createElement(inputImageName.value, inputImageLink.value)
  cardsContainer.prepend(card);
  closePopup(popupAddCard);
}

function setupImagePopup(title, link) {
  image.src = link;
  image.alt = title;
  imageTitle.innerText = title;
}

//close popup on 'esc'
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

//close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('mousedown', closePopupOnClick);
}

//create card
function createElement(title, link) {
  //assign clone of card element in template
  const newElement = elememtTemplate.querySelector('.element').cloneNode(true);

  //assign element fields
  const elementTitle = newElement.querySelector('.element__title');
  const elementImage = newElement.querySelector('.element__image');
  const elementLike = newElement.querySelector('.element__like');
  const elementDelete = newElement.querySelector('.element__delete');

  //set element field values
  elementTitle.innerText = title;
  elementImage.src = link;
  elementImage.alt = title;

  //set event listeners for element
  newElement.addEventListener('click', evt => {
    const evtTarget = evt.target;
    const evtTargetClassList = evtTarget.classList;

    if (evtTargetClassList.contains('element__like')) {
      likeElement(evtTarget);
    } else if (evtTargetClassList.contains('element__delete')) {
      deleteElement(evtTarget)
    } else if (evtTargetClassList.contains('element__image')) {
      openPopup(popupImage);
      setupImagePopup(title, link);
    };
  });

  return newElement;
}

//like card
function likeElement(evtTarget) {
  evtTarget.classList.toggle('element__like_active');
}

//delete card
function deleteElement(evtTarget) {
  evtTarget.closest('.element').remove();
}

// --- initial setup ---
enableValidation(config);

//render initial cards
initialCards.forEach(card => cardsContainer.append(createElement(card.name, card.link)));

//add event listeners for forms
formEditProfile.addEventListener('submit', submitFormEditProfile);
buttonOpenEditProfilePopup.addEventListener('click', function () {
  openPopup(popupEditProfile);
  setupFormEditProfile();
});

formAddCard.addEventListener('submit', submitFormAddCard);
buttonOpenAddCardPopup.addEventListener('click', function () {
  openPopup(popupAddCard);
  setupFormAddCard();
});

//add event listeners for close buttons
closeButtons.forEach(button => button.addEventListener('click', function (evt) {
  closePopup(evt.target.closest('.popup'));
}));