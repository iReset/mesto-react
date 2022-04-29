const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let nameField = document.querySelector('.profile__name');
let aboutField = document.querySelector('.profile__about');
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
let titleInput = document.querySelector('.popup__input_type_title');
let linkInput = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup_type_open-image');
let bigImage = document.querySelector('.popup__image');
let bigCaption = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elementsList = document.querySelector('.elements__list');


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
function saveEditProfile(event) {
  event.preventDefault();
  nameField.textContent = nameInput.value.trim();
  aboutField.textContent = aboutInput.value.trim();
  closePopup(popupEditProfile);
}

// Обрабатывает оправку формы добавления карточки
function saveAddCard(event) {
  event.preventDefault();
  const cardElement = createCard({
    name: titleInput.value,
    alt: titleInput.value,
    link: linkInput.value
  });
  elementsList.prepend(cardElement);
  closePopup(popupAddCard);
}

// "Открывает" окно добавления карточки
function openPopupAddCard() {
  const form = popupAddCard.querySelector('.popup__card');
  form.reset();
  openPopup(popupAddCard);
}

// Изменяет статус лайка
function likeCard(event) {
  event.target.classList.toggle("element__like-button_active");
}

// Удаляет карточку
function removeCard(event) {
  event.target.closest('.element').remove();
}


// Разворачивает изображение на весь экран
function openImage(event) {
  bigImage.src = event.target.src;
  bigCaption.innerText = event.target.closest(".element").querySelector(".element__caption").textContent;
  openPopup(popupOpenImage);
}

editButton.addEventListener('click', openPopupEditProfile);
popupEditProfile.addEventListener('submit', saveEditProfile);
addButton.addEventListener('click', openPopupAddCard);
popupAddCard.addEventListener('submit', saveAddCard);
closeButtons.forEach(button => {
  const popup = button.closest(".popup");
  button.addEventListener('click', () => closePopup(popup));
});