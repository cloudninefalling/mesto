let page = document.querySelector('.page');

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

//query selectors for form elements
let form = popupContainer.querySelector('.edit-form');
let inputName = form.querySelector('.edit-form__text_input_name');
let inputOccupation = form.querySelector('.edit-form__text_input_occupation');

//open popup, set input values
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputOccupation.value = userOccupation.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

//close popup, update profile info
function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userOccupation.textContent = inputOccupation.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', submitPopup);