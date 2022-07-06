import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonEdit,
  cardListSelector,
  optionsCard,
  optionsPopupConfirm,
  optionsPopupWithForm,
  optionsPopupWithImage,
  optionsUserInfo,
  optionsValidation,
  popupAddCardSelector,
  popupConfirmSelector,
  popupEditProfileSelector,
  popupOpenImageSelector,
  token,
  urlMe,
  urlCards,
} from '../utils/constants.js';
import './index.css';


// Информация о пользователе
const userInfo = new UserInfo(optionsUserInfo);

// Попапы с формой
function handleSubmitAddCard({ title: name, link }) {
  fetch(
    urlCards,
    {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        link: link.trim(),
      }),
    },
  )
    .then(res => {
      if (res.status == 200)
        return res.json();
      return Promise.reject(`Словили ошибочку при добавлении карточки: ${res.status}`);
    })
    .then(result => {
      createCard({
        name: result.name,
        link: result.link,
        likes: result.likes.length,
        canDelete: true,
      });
    })
    .catch(err => console.log(err));
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
  fetch(
    urlMe,
    {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        about: about.trim(),
      }),
    },
  )
    .then(res => {
      if (res.status == 200)
        return res.json();
      return Promise.reject(`Словили ошибочку при обновлении инфы о юзере: ${res.status}`);
    })
    .then(result => {
      userInfo.setUserInfo({
        name: result.name,
        about: result.about,
      });
    })
    .catch(err => console.log(err));


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


function handleConfirmDeleteCard(handler) {
  popupConfirm.close();
  handler.bind(this)();
}

const popupConfirm = new PopupConfirm(
  popupConfirmSelector,
  optionsPopupConfirm,
);
popupConfirm.setEventListeners();

// Попап с изображением
const popupWithImage = new PopupWithImage(popupOpenImageSelector, optionsPopupWithImage);
popupWithImage.setEventListeners();


// Работа с карточками
const cardSection = new Section(
  {
    renderer: createCard,
  },
  cardListSelector,
)

async function loadCards() {
  return fetch(urlCards, {
    headers: {
      authorization: token,
    }
  })
    .then(res => {
      if (res.status == 200)
        return res.json();
      return Promise.reject(`Словили ошибочку при загрузке карточек: ${res.status}`);
    })
}

function openImage(card) {
  popupWithImage.open(card);
}

function confirmRemoveImage(handler) {
  popupConfirm.setHandler(handleConfirmDeleteCard.bind(this, handler));
  popupConfirm.open();
}

function createCard(data) {
  const card = new Card(
    data,
    optionsCard,
    {
      handleCardClick: openImage,
      handleRemoveClick: confirmRemoveImage,
    }
  );
  cardSection.addItem(card.createCard());
}

buttonAdd.addEventListener('click', _ => {
  validatorAddCard.resetValidation();
  popupAddCard.open.bind(popupAddCard)();
});
buttonEdit.addEventListener('click', _ => {
  validatorEditProfile.resetValidation();
  popupEditProfile.open.bind(popupEditProfile)()
});

async function loadUserInfo() {
  return fetch(urlMe, {
    headers: {
      authorization: token,
    }
  })
    .then(res => {
      if (res.status == 200)
        return res.json();
      return Promise.reject(`Поймали ошибочку при загрузке инфы о юзере: ${res.status}`);
    })
}

Promise.all([loadUserInfo(), loadCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards.map(item => {
      return {
        name: item.name,
        link: item.link,
        likes: item.likes.length,
        canDelete: item.owner._id && item.owner._id == userInfo.getUserId(),
      }
    }));
  })
  .catch(err => console.log(err));
