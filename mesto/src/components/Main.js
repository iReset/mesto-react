import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

import api from '../utils/api';
import { optionsCard } from '../utils/constants';

function Main(props) {
  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    if (!currentUser)
      return;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setLike(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(console.log);
  }

  React.useEffect(() => {
    api.loadCards()
      .then(_cards => setCards(_cards))
      .catch(console.log);
  }, []);

  return (
    <main className="main">
      <section className="profile root__profile">
        <button
          className="profile__avatar-edit button"
          type="button"
          aria-label="Изменить аватар."
          onClick={props.onEditAvatar}
        >
          <img className="profile__avatar" src={currentUser && currentUser.avatar} alt="Аватар пользователя." />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser && currentUser.name}</h1>
          <p className="profile__about">{currentUser && currentUser.about}</p>
          <button
            className="profile__edit-button button"
            type="button"
            aria-label="Редактировать."
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          aria-label="Добавить."
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements root__elements" aria-label="Блок с карточками мест.">
        <ul className="elements__list">
          {cards.map(card => {
            return (
              <Card
                key={card._id}
                card={card}
                options={optionsCard}
                onCardClick={props.onCardClick}
                onCardLike={handleCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
