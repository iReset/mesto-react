import Card from './Card.js';
import Section from './Section.js';
import { initialCards, optionsCard, optionsPopupWithImage } from './init-data.js';
import initPopupEditProfile from './popup-edit-profile.js';
import initPopupAddCard from './popup-add-card.js';
import PopupWithImage from './PopupWithImage.js';


// Обрабатывает нажатие Escape
function handleEscape(event) {
  if (event.key !== 'Escape') {
    return;
  }
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}

// "Открывает" всплывающее окно
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

// "Закрывает" всплывающее окно
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}


// Попап с изображением
const popupWithImage = new PopupWithImage(optionsPopupWithImage);
popupWithImage.setEventListeners();


// Работа с карточками
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  '.elements__list',
)

function openImage(card) {
  popupWithImage.open(card);
}

export function createCard(data) {
  const card = new Card(data, optionsCard, openImage);
  cardSection.addItem(card.createCard());
}

cardSection.renderItems();


initPopupEditProfile();
initPopupAddCard();
