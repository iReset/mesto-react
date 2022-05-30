import FormValidator from './form-validator.js'
import { closePopup, createCard, elementsList, openPopup } from './index.js';
import { optionsValidation } from './init-data.js';

const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAdd = popupAddCard.querySelector('.popup__card');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

const formAddValidation = new FormValidator(document.forms.add_card, optionsValidation);
formAddValidation.enableValidation();

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

buttonAdd.addEventListener('click', openPopupAddCard);
popupAddCard.addEventListener('submit', saveAddCard);
