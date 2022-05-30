import Card from './card.js';
import { initialCards, optionsCard } from './init-data.js';

const popups = document.querySelectorAll('.popup');
const buttonsClose = document.querySelectorAll('.popup__close-button');
export const elementsList = document.querySelector('.elements__list');


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

// Создает карточку
export function createCard(data) {
  const card = new Card(data, optionsCard);
  return card.createCard();
}

initialCards.forEach(card => {
  elementsList.append(createCard(card));
});

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
