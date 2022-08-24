import React from 'react';

import api from '../utils/api.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    api.loadUserInfo()
      .then(data => {
        const { user, about, _id, avatar } = data;
        setUserName(user);
        setUserDescription(about);
        setUserAvatar(avatar);
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
        </ul>
      </section>
    </main>
  );
}

export default Main;
