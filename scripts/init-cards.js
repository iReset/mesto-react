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


initialCards.forEach (card => {
  const elementsList = document.querySelector('.elements__list');

  elementsList.append(createCard(card));
});


function createCard(card) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.cloneNode(true);
  const elementCaption = element.querySelector('.element__caption');
  const elementImage = element.querySelector('.element__image');
  const elementLike = element.querySelector('.element__like-button');
  const elementRemove = element.querySelector('.element__remove-button');

  elementCaption.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.alt;
  elementLike.addEventListener("click", likeCard);
  elementRemove.addEventListener("click", removeCard);

  return element;
}
