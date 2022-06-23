const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/elements/karachaevsk.min.jpg',
    alt: 'Церковь в Карачаевске на фоне гор.'
  },
  {
    name: 'Тропа Предков',
    link: './images/elements/ancestral-trail.min.jpg',
    alt: 'Тропа Предков в Хакассии на фоне хребта и реки.'
  },
  {
    name: 'Горы Алтая',
    link: './images/elements/altai-mountains.min.jpg',
    alt: 'Река в горах Алтая.'
  },
  {
    name: 'Эльбрус',
    link: './images/elements/elbrus.min.jpg',
    alt: 'Небольшая речка в районе Эльбруса.'
  },
  {
    name: 'Домбай',
    link: './images/elements/dombai.min.jpg',
    alt: 'Вид на горы горнолыжного курорта Домбай.'
  },
  {
    name: 'Камчатка',
    link: './images/elements/kamchatka.min.jpg',
    alt: 'Прямая дорога ведет к горе на Камчатке.'
  }
];

const optionsCard = {
  template: '#element',
  classCard: '.element',
  likeButton: '.element__like-button',
  removeButton: '.element__remove-button',
  likeButtonActive: 'element__like-button_active',
  image: '.element__image',
  caption: '.element__caption',
};

const optionsValidation = {
  buttonSubmitClass: 'popup__save-button',
  inputErrorClass: 'popup__input_type_error',
  inputSelector: 'popup__input',
};

const optionsPopupWithImage = {
  selector: '.popup_type_open-image',
  captionSelector: '.popup__caption',
  imageSelector: '.popup__image',
}

export { initialCards, optionsCard, optionsPopupWithImage, optionsValidation };
