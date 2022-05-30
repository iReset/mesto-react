import FormValidator from './form-validator.js'
import { closePopup, openPopup } from './index.js';
import { optionsValidation } from './init-data.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const fieldAbout = document.querySelector('.profile__about');
const fieldName = document.querySelector('.profile__name');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__profile');
const inputAbout = document.querySelector('.popup__input_type_about');
const inputName = document.querySelector('.popup__input_type_name');

const formEditValidation = new FormValidator(document.forms.profile_edit, optionsValidation);
formEditValidation.enableValidation();

// "Открывает" окно редактирования профиля
function openPopupEditProfile() {
  inputName.value = fieldName.textContent.trim();
  inputAbout.value = fieldAbout.textContent.trim();
  formEditValidation.resetValidation();
  openPopup(popupEditProfile);
}

// Обрабатывает оправку формы редактирования профиля
function saveEditProfile(event) {
  event.preventDefault();
  fieldName.textContent = inputName.value.trim();
  fieldAbout.textContent = inputAbout.value.trim();
  closePopup(popupEditProfile);
}

buttonEdit.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', saveEditProfile);
