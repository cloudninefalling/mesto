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

//query selectors for popup types
const popupEdit = page.querySelector('.popup_edit-profile');
const popupAddImage = page.querySelector('.popup_add-card');
const popupImage = page.querySelector('.popup_image');

//query selectors for editForm
const editForm = popupEdit.querySelector('.edit-form');
const inputName = editForm.querySelector('.edit-form__text_input_profile-name');
const inputOccupation = editForm.querySelector('.edit-form__text_input_profile-occupation');

//query selectors for addForm
const addForm = popupAddImage.querySelector('.edit-form');
const inputImageName = addForm.querySelector('.edit-form__text_input_image-name');
const inputImageLink = addForm.querySelector('.edit-form__text_input_image-link');

//query selectors for image popup
const image = popupImage.querySelector('.popup-image');
const imageTitle = popupImage.querySelector('.popup-image__title');

//initial cards TODO: move to different file constants.js
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

//open popup TODO: merge here
function openPopup(evt) {
  switch (evt.target.classList[0]) { //TODO: open necessary popups
    case 'profile-info__edit-button':
      //open popup
      popupEdit.classList.add('popup_opened');
      //set input values
      inputName.value = userName.textContent;
      inputOccupation.value = userOccupation.textContent;
      //add submit event listener
      editForm.addEventListener('submit', submitEditForm);
      //focus on input
      inputName.focus();
      break;
    case 'profile__add-button':
      //open popup
      popupAddImage.classList.add('popup_opened');
      //add submit event listener
      addForm.addEventListener('submit', submitAddForm);
      //clear input values
      inputImageName.value = '';
      inputImageLink.value = '';
      //focus on input
      inputImageName.focus();
      break;
    case 'element__image':
      //open popup
      popupImage.classList.add('popup_opened');
      image.src = evt.target.src;
      image.alt = evt.target.alt;
      imageTitle.innerText = evt.target.alt;
      break;
  }
}

//update profile info and close popup 
function submitEditForm(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  closePopup('edit-form');
}

//add image and close popup
function submitAddForm(evt) {
  evt.preventDefault();
  const card = createElement(inputImageName.value, inputImageLink.value)
  elements.prepend(card);
  closePopup('add-image');
}

//close popup
function closePopup(formName) {
  switch (formName) {
    case 'edit-form':
      popupEdit.classList.remove('popup_opened');
    case 'add-image':
      popupAddImage.classList.remove('popup_opened');
    case 'image':
      popupImage.classList.remove('popup_opened');
  }
}

//create card
function createElement(name, link) {
  //assign elements
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
  elementImage.addEventListener('click', openPopup); //add event listener to image
  elementLike.addEventListener('click', likeElement); //add event listener to like button
  elementDelete.addEventListener('click', deleteElement); //add event listener to delete button

  return newElement;
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
initialCards.forEach(element => elements.append(createElement(element.name, element.link)));



//    --- event listeners ---

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
//close buttons
popupEdit.querySelector('.popup__close').addEventListener('click', closePopup.bind(null, 'edit-form'));
popupAddImage.querySelector('.popup__close').addEventListener('click', closePopup.bind(null, 'add-image'));
popupImage.querySelector('.popup__close').addEventListener('click', closePopup.bind(null, 'image'));
