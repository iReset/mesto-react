import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonEdit,
  initialCards,
  optionsCard,
  optionsPopupWithForm,
  optionsPopupWithImage,
  optionsUserInfo,
  popupAddCardSelector,
  popupEditProfileSelector,
} from '../utils/constants.js';


// Информация о пользователе
const userInfo = new UserInfo(optionsUserInfo);

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
