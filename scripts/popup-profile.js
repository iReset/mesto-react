const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let nameField = document.querySelector('.profile__name');
let aboutField = document.querySelector('.profile__about');

// "Открывает" окно редактирования профиля
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameField.textContent.trim();
  aboutInput.value = aboutField.textContent.trim();
  nameInput.focus();
}

// "Закрывает" окно редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обрабатывает оправку формы
function formSubmitHandler(event) {
  event.preventDefault();
  nameField.textContent = nameInput.value.trim();
  aboutField.textContent = aboutInput.value.trim();
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('submit', formSubmitHandler);
