import FormValidator from './FormValidator.js'
import { closePopup, createCard, elementsList, openPopup } from './index.js';
import { optionsValidation } from './init-data.js';

const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAdd = document.forms.add_card;
const formAddValidation = new FormValidator(formAdd, optionsValidation);
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

// "Открывает" окно добавления карточки
function openPopupAddCard() {
  formAdd.reset();
  formAddValidation.resetValidation();
  openPopup(popupAddCard);
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

export default function initAddCard() {
  buttonAdd.addEventListener('click', openPopupAddCard);
  formAdd.addEventListener('submit', saveAddCard);
  formAddValidation.enableValidation();
}
