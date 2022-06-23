import Card from './Card.js';
import Section from './Section.js';
import { initialCards, optionsCard } from './init-data.js';
import initPopupEditProfile from './popup-edit-profile.js';
import initPopupAddCard from './popup-add-card.js';

const popups = document.querySelectorAll('.popup');
const buttonsClose = document.querySelectorAll('.popup__close-button');


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


// Работа с карточками
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  '.elements__list',
);
export function createCard(data) {
  const card = new Card(data, optionsCard);
  cardSection.addItem(card.createCard());
}

cardSection.renderItems();


buttonsClose.forEach(button => {
  const popup = button.closest(".popup");
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
})

initPopupEditProfile();
initPopupAddCard();
