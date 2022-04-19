const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let nameField = document.querySelector('.profile__name');
let aboutField = document.querySelector('.profile__about');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameField.textContent.trim();
  aboutInput.value = aboutField.textContent.trim();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  nameField.textContent = nameInput.value.trim();
  aboutField.textContent = aboutInput.value.trim();
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('submit', formSubmitHandler);
