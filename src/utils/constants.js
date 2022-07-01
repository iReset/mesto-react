const altaiMountains = new URL('../images/elements/altai-mountains.min.jpg', import.meta.url);
const ancestralTrail = new URL('../images/elements/ancestral-trail.min.jpg', import.meta.url);
const dombai = new URL('../images/elements/dombai.min.jpg', import.meta.url);
const elbrus = new URL('../images/elements/elbrus.min.jpg', import.meta.url);
const kamchatka = new URL('../images/elements/kamchatka.min.jpg', import.meta.url);
const karachaevsk = new URL('../images/elements/karachaevsk.min.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Карачаевск',
    link: karachaevsk,
    alt: 'Церковь в Карачаевске на фоне гор.'
  },
  {
    name: 'Тропа Предков',
    link: ancestralTrail,
    alt: 'Тропа Предков в Хакассии на фоне хребта и реки.'
  },
  {
    name: 'Горы Алтая',
    link: altaiMountains,
    alt: 'Река в горах Алтая.'
  },
  {
    name: 'Эльбрус',
    link: elbrus,
    alt: 'Небольшая речка в районе Эльбруса.'
  },
  {
    name: 'Домбай',
    link: dombai,
    alt: 'Вид на горы горнолыжного курорта Домбай.'
  },
  {
    name: 'Камчатка',
    link: kamchatka,
    alt: 'Прямая дорога ведет к горе на Камчатке.'
  }
];

export const optionsCard = {
  template: '#element',
  classCard: '.element',
  likeButton: '.element__like-button',
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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
}

export const optionsUserInfo = {
  selectorName: '.profile__name',
  selectorAbout: '.profile__about',
}

export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const cardListSelector = '.elements__list';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupOpenImageSelector = '.popup_type_open-image';

export const token = `${process.env.TOKEN}`;
export const url = `https://nomoreparties.co/v1/${process.env.COHORT}/users/me`;
