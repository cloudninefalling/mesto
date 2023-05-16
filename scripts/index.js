//    --- constants ---

//query selector for page elements
const page = document.querySelector('.page');

//query selector for card elements
const elements = document.querySelector('.elements');

//query selectors for profile elements
const profile = page.querySelector('.profile');
const addButton = profile.querySelector('.profile__add-button')
const profileInfo = profile.querySelector('.profile-info');
const userName = profileInfo.querySelector('.profile-info__name');
const userOccupation = profileInfo.querySelector('.profile-info__occupation');
const editButton = profileInfo.querySelector('.profile-info__edit-button');

//query selectors for popup elements
const popup = page.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const popupContainer = popup.querySelector('.popup__container');
const editForm = popupContainer.querySelector('.edit-form');

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



//    --- variables ---

let inputName;
let inputOccupation;

let inputImageName;
let inputImageLink;



//    --- functions ---

//open edit-profile popup
function openEditProfile() {
  //open popup
  popup.classList.add('popup_opened')

  //set form elements
  editForm.setAttribute('name', 'edit-profile');
  const title = editForm.querySelector('.edit-form__title');
  const inputText = editForm.querySelectorAll('.edit-form__text');
  inputName = inputText[0];
  inputOccupation = inputText[1];

  //add classes to input elements, set attributes
  inputName.classList.add('edit-form__text_input_profile-name');
  inputName.setAttribute('placeholder', 'Имя');
  inputName.setAttribute('name', 'input-name');
  inputName.setAttribute('required', true);

  inputOccupation.classList.add('edit-form__text_input_profile-occupation');
  inputOccupation.setAttribute('placeholder', 'О себе');
  inputOccupation.setAttribute('name', 'input-occupation');

  //set input values
  title.innerText = 'Редактировать профиль';
  inputName.value = userName.textContent;
  inputOccupation.value = userOccupation.textContent;

  //add submit event listener
  editForm.addEventListener('submit', submitEditForm);
}

//close popup, update profile info
function submitEditForm(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  closePopup();
}

//open add-image popup
function openAddImage() {
  //open popup
  popup.classList.add('popup_opened');

  //set form elements
  editForm.setAttribute('name', 'add-image');
  const title = editForm.querySelector('.edit-form__title');
  const inputText = editForm.querySelectorAll('.edit-form__text');
  inputImageName = inputText[0];
  inputImageLink = inputText[1];

  //add classes to input elements, set attributes
  inputImageName.classList.add('edit-form__text_input_image-name');
  inputImageName.setAttribute('placeholder', 'Название');
  inputImageName.setAttribute('name', 'input-image-name');
  inputImageName.setAttribute('required', true);

  inputImageLink.classList.add('edit-form__text_input_image-link');
  inputImageLink.setAttribute('placeholder', 'Ссылка на картинку');
  inputImageLink.setAttribute('name', 'input-image-link');
  inputImageLink.setAttribute('required', true);

  //set input values
  title.innerText = 'Новое место';

  //add submit event listener
  editForm.addEventListener('submit', submitAddForm);
}

//close popup, add image
function submitAddForm(evt) {
  evt.preventDefault();
  createElement(inputImageName.value, inputImageLink.value);
  closePopup();
}

//close popup
function closePopup() {
  if (editForm.name === 'edit-profile') {
    inputName.value = ''; //clear inputName value and class
    inputName.classList.remove('edit-form__text_input_profile-name');

    inputOccupation.value = ''; //clear inputOccupation value and class
    inputOccupation.classList.remove('edit-form__text_input_profile-occupation');

    editForm.removeAttribute('name', 'edit-profile'); //remove attribute name from form element
    editForm.removeEventListener('submit', submitEditForm); //remove event listener from form element

  } else if (editForm.name === 'add-image') {
    inputImageName.value = ''; //clear inputImageName value and class
    inputImageName.classList.remove('edit-form__text_input_image-name');

    inputImageLink.value = ''; //clear inputImageLink value and class 
    inputImageLink.classList.remove('edit-form__text_input_image-link');

    editForm.removeAttribute('name', 'add-image'); //remove attribute name from form element
    editForm.removeEventListener('submit', submitAddForm); //remove event listener from form element

  }
  popup.classList.remove('popup_opened');
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

editButton.addEventListener('click', openEditProfile);
closeButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openAddImage);