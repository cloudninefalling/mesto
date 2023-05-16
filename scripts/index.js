//    --- constants ---

//query selector for page elements
let page = document.querySelector('.page');

//query selector for card elements
let elements = document.querySelector('.elements');

//query selectors for profile elements
let profile = page.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let userName = profileInfo.querySelector('.profile-info__name');
let userOccupation = profileInfo.querySelector('.profile-info__occupation');
let editButton = profileInfo.querySelector('.profile-info__edit-button');

//query selectors for popup elements
let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let popupContainer = popup.querySelector('.popup__container');

//query selectors for edit-form elements
let editForm = popupContainer.querySelector('.edit-form');
let inputName = editForm.querySelector('.edit-form__text_input_name');
let inputOccupation = editForm.querySelector('.edit-form__text_input_occupation');

//query selectors for add-form elements TODO:


//initial cards
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



//    --- functions ---

//open popup, set input values
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputOccupation.value = userOccupation.textContent;
}

//close popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

//close popup, update profile info
function submitEditForm(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  closePopup();
}

//close popup, add image
function submitAddForm(evt) {
  evt.preventDefault();
  createElement(inputName.value, inputLink.value);
}

//create card
function createElement(name, link) {
  const elememtTemplate = document.querySelector('#element-template').content; //assign template element
  const newElement = elememtTemplate.querySelector('.element').cloneNode(true); //assign clone of card element

  newElement.querySelector('.element__title').innerText = name; //set element name
  newElement.querySelector('.element__image').src = link; //set element src image
  newElement.querySelector('.element__image').alt = name; //set element alt
  newElement.querySelector('.element__like').addEventListener('click', likeElement); //add event listener to like button
  newElement.querySelector('.element__delete').addEventListener('click', deleteElement); //add event listener to delete button

  elements.append(newElement); //append new element to elements
}

//like card
function likeElement(evt) {
  evt.target.classList.toggle('element__like_active');
}

//delete card
function deleteElement(evt) {
  evt.target.closest('.element').remove();
}

//create initial cards
initialCards.forEach(element => createElement(element.name, element.link));



//    --- event listeners ---

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', submitEditForm);