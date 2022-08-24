import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonAvatar,
  buttonEdit,
  cardListSelector,
  handlersApi,
  optionsCard,
  optionsPopupConfirm,
  optionsPopupWithForm,
  optionsPopupWithImage,
  optionsUserInfo,
  optionsValidation,
  popupAddCardSelector,
  popupConfirmSelector,
  popupEditAvatarSelector,
  popupEditProfileSelector,
  popupOpenImageSelector,
  token,
  urlApiBase,
} from '../../mesto/src/utils/constants.js';
import './index.css';


// Работа с пользователем
const userInfo = new UserInfo(optionsUserInfo);


function handleSubmitEditProfile({ name, about }) {
  api.editProfile({
    name: name.trim(),
    about: about.trim(),
  })
    .then(result => {
      popupEditProfile.close();
      userInfo.setUserInfo({
        name: result.name,
        about: result.about,
      });
    })
    .catch(console.log)
    .finally(_ => popupEditProfile.setWaitingState(false));
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


function handleSubmitEditAvatar({ avatar_link }) {
  api.editAvatar({
    avatar: avatar_link.trim(),
  })
    .then(result => {
      popupEditAvatar.close();
      userInfo.setUserInfo(result);
    })
    .catch(console.log)
    .finally(_ => popupEditAvatar.setWaitingState(false));
}

const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  optionsPopupWithForm,
  handleSubmitEditAvatar,
);
popupEditAvatar.setEventListeners();
const validatorEditAvatar = new FormValidator(popupEditAvatar.getForm(), optionsValidation);
validatorEditAvatar.enableValidation();

// Работа с карточками
function handleSubmitAddCard({ title: name, link }) {
  api.addCard({
    name: name.trim(),
    link: link.trim(),
  })
    .then(result => {
      popupAddCard.close();
      createCard({
        id: result._id,
        name: result.name,
        link: result.link,
        likes: result.likes.length,
        liked: result.likes.filter(like => like._id == userInfo.getUserId()).length > 0,
        canDelete: true,
      });
    })
    .catch(console.log)
    .finally(_ => popupAddCard.setWaitingState(false));
}

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  optionsPopupWithForm,
  handleSubmitAddCard,
);
popupAddCard.setEventListeners();
const validatorAddCard = new FormValidator(popupAddCard.getForm(), optionsValidation);
validatorAddCard.enableValidation();


function handleConfirmDeleteCard() {
  api.deleteCard(this.getId())
    .then(_ => {
      popupConfirm.close();
      this.removeCard();
    })
    .catch(console.log)
    .finally(_ => popupConfirm.setWaitingState(false));
}

const popupConfirm = new PopupConfirm(
  popupConfirmSelector,
  optionsPopupConfirm,
);
popupConfirm.setEventListeners();
popupConfirm.setConfirmButtonTexts({ textWaiting: 'Удаление...' });

const popupWithImage = new PopupWithImage(popupOpenImageSelector, optionsPopupWithImage);
popupWithImage.setEventListeners();


const cardSection = new Section(
  {
    renderer: createCard,
  },
  cardListSelector,
)

function openImage(card) {
  popupWithImage.open(card);
}

function confirmRemoveImage() {
  popupConfirm.setHandler(handleConfirmDeleteCard.bind(this));
  popupConfirm.open();
}

function toggleLikeCard() {
  api.setLike(this.getId(), !this.isLiked())
    .then(card => {
      this.setLike(
        card.likes.find(user => user._id == userInfo.getUserId()) != undefined,
        card.likes.length,
      );
    })
    .catch(console.log);
}

function createCard(data) {
  const card = new Card(
    data,
    optionsCard,
    {
      handleCardClick: openImage,
      handleLikeClick: toggleLikeCard,
      handleRemoveClick: confirmRemoveImage,
    }
  );
  cardSection.addItem(card.createCard());
}


// Обработка кнопок
buttonAdd.addEventListener('click', _ => {
  validatorAddCard.resetValidation();
  popupAddCard.open.bind(popupAddCard)();
});
buttonEdit.addEventListener('click', _ => {
  validatorEditProfile.resetValidation();
  popupEditProfile.open.bind(popupEditProfile)()
});
buttonAvatar.addEventListener('click', _ => {
  validatorEditAvatar.resetValidation();
  popupEditAvatar.open.bind(popupEditAvatar)()
});


// Api и начальная загрузка
const api = new Api(
  urlApiBase,
  handlersApi,
  {
    authorization: token,
    'Content-Type': 'application/json'
  }
);

Promise.all([api.loadUserInfo(), api.loadCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards.reverse().map(item => {
      return {
        id: item._id,
        name: item.name,
        link: item.link,
        likes: item.likes.length,
        liked: item.likes.find(user => user._id == userInfo.getUserId()) != undefined,
        canDelete: item.owner._id && item.owner._id == userInfo.getUserId(),
      }
    }));
  })
  .catch(console.log);
