const fieldBigCaption = document.querySelector('.popup__caption');
const fieldBigImage = document.querySelector('.popup__image');
const popupOpenImage = document.querySelector('.popup_type_open-image');
import { openPopup } from './index.js';

// Разворачивает изображение на весь экран
export function openImage(card) {
  fieldBigImage.src = card.link;
  fieldBigImage.alt = card.alt;
  fieldBigCaption.textContent = card.name;
  openPopup(popupOpenImage);
}
