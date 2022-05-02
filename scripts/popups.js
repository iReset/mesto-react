const buttonEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const fieldName = document.querySelector('.profile__name');
const fieldAbout = document.querySelector('.profile__about');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup_type_open-image');
const fieldBigImage = document.querySelector('.popup__image');
const fieldBigCaption = document.querySelector('.popup__caption');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element').content;


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
  inputName.value = fieldName.textContent.trim();
  inputAbout.value = fieldAbout.textContent.trim();
  openPopup(popupEditProfile);
}

// Обрабатывает оправку формы редактирования профиля
function saveEditProfile(event) {
  event.preventDefault();
  fieldName.textContent = inputName.value.trim();
  fieldAbout.textContent = inputAbout.value.trim();
  closePopup(popupEditProfile);
}

// Обрабатывает оправку формы добавления карточки
function saveAddCard(event) {
  event.preventDefault();
  const cardElement = createCard({
    name: inputTitle.value,
    alt: inputTitle.value,
    link: inputLink.value
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
function openImage(card) {
  fieldBigImage.src = card.link;
  fieldBigCaption.innerText = card.name;
  openPopup(popupOpenImage);
}

// Создает карточку
function createCard(card) {
  const element = elementTemplate.cloneNode(true);
  const elementCaption = element.querySelector('.element__caption');
  const elementImage = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like-button');
  const elementRemove = element.querySelector('.element__remove-button');

  elementCaption.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.alt;
  elementImage.addEventListener("click", () => openImage(card))
  elementLike.addEventListener("click", likeCard);
  elementRemove.addEventListener("click", removeCard);

  return element;
}


buttonEdit.addEventListener('click', openPopupEditProfile);
popupEditProfile.addEventListener('submit', saveEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);
popupAddCard.addEventListener('submit', saveAddCard);

initialCards.forEach(card => {
  elementsList.append(createCard(card));
});
buttonsClose.forEach(button => {
  const popup = button.closest(".popup");
  button.addEventListener('click', () => closePopup(popup));
});
