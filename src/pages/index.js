import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonEdit,
  cardListSelector,
  initialCards,
  optionsCard,
  optionsPopupWithForm,
  optionsPopupWithImage,
  optionsUserInfo,
  optionsValidation,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupOpenImageSelector,
  token,
  url,
} from '../utils/constants.js';
import './index.css';


// Информация о пользователе
const userInfo = new UserInfo(optionsUserInfo);

// Попапы с формой
function handleSubmitAddCard({ title: name, link }) {
  createCard({ name, link });
}

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  optionsPopupWithForm,
  handleSubmitAddCard,
);
popupAddCard.setEventListeners();
const validatorAddCard = new FormValidator(popupAddCard.getForm(), optionsValidation);
validatorAddCard.enableValidation();

function handleSubmitEditProfile({ name, about }) {
  userInfo.setUserInfo({
    name: name.trim(),
    about: about.trim(),
  })
}

const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  optionsPopupWithForm,
  handleSubmitEditProfile,
  userInfo.getUserInfo.bind(userInfo),
);
popupEditProfile.setEventListeners();
const validatorEditProfile = new FormValidator(popupEditProfile.getForm(), optionsValidation);
validatorEditProfile.enableValidation();


// Попап с изображением
const popupWithImage = new PopupWithImage(popupOpenImageSelector, optionsPopupWithImage);
popupWithImage.setEventListeners();


// Работа с карточками
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardListSelector,
)

function openImage(card) {
  popupWithImage.open(card);
}

function createCard(data) {
  const card = new Card(data, optionsCard, openImage);
  cardSection.addItem(card.createCard());
}

buttonAdd.addEventListener('click', _ => {
  validatorAddCard.resetValidation();
  popupAddCard.open.bind(popupAddCard)();
});
buttonEdit.addEventListener('click', _ => {
  validatorEditProfile.resetValidation();
  popupEditProfile.open.bind(popupEditProfile)
});
cardSection.renderItems();

fetch(url, {
  headers: {
    authorization: token,
  }
})
  .then(res => {
    if (res.status == 200)
      return res.json();
    return Promise.reject(`А вот и ошибочка: ${res.status}`);
  })
  .then(result => {
    userInfo.setUserInfo(result).bind(userInfo);
  })
  .catch(err => console.log(err));
