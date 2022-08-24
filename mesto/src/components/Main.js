import React from 'react';

import Card from './Card';

import api from '../utils/api.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.loadUserInfo(), api.loadCards()])
      .then(([data, cards]) => {
        const { name, about, avatar } = data;
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards(cards);
      })
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
          <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя." />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__about">{userDescription}</p>
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
                id={card._id}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
