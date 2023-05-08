let page = document.querySelector('.page');
let profile = page.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let userName = profileInfo.querySelector('.profile-info__name');
let userOccupation = profileInfo.querySelector('.profile-info__occupation');
let editButton = profileInfo.querySelector('.profile-info__edit-button');

let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let submitButton = popup.querySelector('.popup__submit');
let popupForm = popup.querySelector('.popup__container');
let inputName = popupForm.querySelector('.popup__name');
let inputOccupation = popupForm.querySelector('.popup__occupation');

function openPopup() {
  popup.classList.add('popup__opened');
  inputName.value = userName.textContent;
  inputOccupation.value = userOccupation.textContent;
}

function closePopup() {
  popup.classList.remove('popup__opened');
}

function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  popup.classList.remove('popup__opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
submitButton.addEventListener('click', submitPopup);