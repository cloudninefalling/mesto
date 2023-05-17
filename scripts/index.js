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

let formName;



//    --- functions ---

//open popup
function openPopup() {
  popup.classList.add('popup_opened');
  while (popupContainer.children.length > 1) {
    popupContainer.removeChild(popupContainer.lastChild);
  }
}



//open edit-profile popup
function openEditProfile() {
  openPopup();
  const template = document.querySelector('#edit-form-template').content;
  const editForm = template.querySelector('.edit-form').cloneNode(true);

  //set form elements
  editForm.setAttribute('name', 'edit-profile');
  formName = editForm.name;
  const title = editForm.querySelector('.edit-form__title');
  const inputText = editForm.querySelectorAll('.edit-form__text');
  const submitButton = editForm.querySelector('.edit-form__submit');
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
  submitButton.innerText = 'Сохранить';

  inputName.value = userName.textContent;
  inputOccupation.value = userOccupation.textContent;

  //add submit event listener
  editForm.addEventListener('submit', submitEditForm);

  //append form to popup container
  popupContainer.appendChild(editForm);
}

//update profile info and close popup 
function submitEditForm(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  closePopup();
}

//open add-image popup
function openAddImage() {
  openPopup();
  const template = document.querySelector('#edit-form-template').content;
  const editForm = template.querySelector('.edit-form').cloneNode(true);

  //set form elements
  editForm.setAttribute('name', 'add-image');
  formName = editForm.name;
  const title = editForm.querySelector('.edit-form__title');
  const inputText = editForm.querySelectorAll('.edit-form__text');
  const submitButton = editForm.querySelector('.edit-form__submit');
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
  submitButton.innerText = 'Создать';
  inputImageName.value = '';
  inputImageLink.value = '';

  //add submit event listener
  editForm.addEventListener('submit', submitAddForm);

  popupContainer.appendChild(editForm); //append form to popup container
}

//add image and close popup
function submitAddForm(evt) {
  evt.preventDefault();
  createElement(inputImageName.value, inputImageLink.value);
  closePopup();
}

//open card popup
function openImage(evt) {
  openPopup();
  popup.classList.add('popup_dark');
  const template = document.querySelector('#popup-image-template').content;
  const image = template.querySelector('.popup-image').cloneNode();
  const imageTitle = template.querySelector('.popup-image__title').cloneNode();

  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageTitle.innerText = evt.target.alt;

  popupContainer.appendChild(image);
  popupContainer.appendChild(imageTitle);
}

//close popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

//create card
function createElement(name, link) {
  const elememtTemplate = document.querySelector('#element-template').content; //assign template element
  const newElement = elememtTemplate.querySelector('.element').cloneNode(true); //assign clone of card element

  //assign element fields
  const elementTitle = newElement.querySelector('.element__title');
  const elementImage = newElement.querySelector('.element__image');
  const elementLike = newElement.querySelector('.element__like');
  const elementDelete = newElement.querySelector('.element__delete');

  //set element field values
  elementTitle.innerText = name;
  elementImage.src = link;
  elementImage.alt = name;

  //assign event listeners
  elementImage.addEventListener('click', openImage); //add event listener to image
  elementLike.addEventListener('click', likeElement); //add event listener to like button
  elementDelete.addEventListener('click', deleteElement); //add event listener to delete button

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