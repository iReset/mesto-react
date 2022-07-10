export const optionsCard = {
  template: '#element',
  classCard: '.element',
  likeButton: '.element__like-button',
  quantity: '.element__like-quantity',
  removeButton: '.element__remove-button',
  likeButtonActive: 'element__like-button_active',
  image: '.element__image',
  caption: '.element__caption',
};

export const optionsValidation = {
  buttonSubmitClass: 'popup__save-button',
  inputErrorClass: 'popup__input_type_error',
  inputSelector: 'popup__input',
};

export const optionsPopupWithImage = {
  captionSelector: '.popup__caption',
  imageSelector: '.popup__image',
}

export const optionsPopupWithForm = {
  buttonSelector: '.popup__save-button',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
}

export const optionsPopupConfirm = {
  formSelector: '.popup__form',
}

export const optionsUserInfo = {
  selectorName: '.profile__name',
  selectorAbout: '.profile__about',
  selectorAvatar: '.profile__avatar',
}

export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonAvatar = document.querySelector('.profile__avatar-edit');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const cardListSelector = '.elements__list';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupConfirmSelector = '.popup_type_confirm';
export const popupEditAvatarSelector = '.popup_type_edit-avatar';
export const popupEditProfileSelector = '.popup_type_edit-profile';

export const popupOpenImageSelector = '.popup_type_open-image';

export const token = `${process.env.TOKEN}`;
const urlApi = 'https://nomoreparties.co/v1'
const cohort = `${process.env.COHORT}`
export const urlApiBase = `${urlApi}/${cohort}`

export const handlersApi = {
  me: 'users/me',
  avatar: 'users/me/avatar',
  cards: 'cards',
  likes: 'cards/likes',
}
