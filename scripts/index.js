import Card from './Card.js';
import Section from './Section.js';
import {
  buttonAdd,
  buttonEdit,
  fieldAbout,
  fieldName,
  initialCards,
  optionsCard,
  optionsPopupWithForm,
  optionsPopupWithImage,
  popupAddCardSelector,
  popupEditProfileSelector,
} from './init-data.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';


// Попапы с формой
function handleSubmitAddCard({ title: name, link }) {
  createCard({name, link});
}

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  optionsPopupWithForm,
  handleSubmitAddCard,
);
popupAddCard.setEventListeners();

function handleSubmitEditProfile({ name, about }) {
  fieldName.textContent = name.trim();
  fieldAbout.textContent = about.trim();
}

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  optionsPopupWithForm,
  handleSubmitEditProfile,
);
popupEditProfile.setEventListeners();


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

function createCard(data) {
  const card = new Card(data, optionsCard, openImage);
  cardSection.addItem(card.createCard());
}

buttonAdd.addEventListener('click', popupAddCard.open.bind(popupAddCard));
buttonEdit.addEventListener('click', popupEditProfile.open.bind(popupEditProfile));
cardSection.renderItems();
