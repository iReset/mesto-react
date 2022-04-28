const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let nameField = document.querySelector('.profile__name');
let aboutField = document.querySelector('.profile__about');

// "Открывает" всплывающее окно
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// "Закрывает" всплывающее окно
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// "Открывает" окно редактирования профиля
function openPopupEditProfile() {
  nameInput.value = nameField.textContent.trim();
  aboutInput.value = aboutField.textContent.trim();
  openPopup(popupEditProfile);
}

// Обрабатывает оправку формы редактирования профиля
function handleFormSubmit(event) {
  event.preventDefault();
  nameField.textContent = nameInput.value.trim();
  aboutField.textContent = aboutInput.value.trim();
  closePopup(popupEditProfile);
}

editButton.addEventListener('click', openPopupEditProfile);
closeButton.addEventListener('click', closePopup);
popupEditProfile.addEventListener('submit', handleFormSubmit);
