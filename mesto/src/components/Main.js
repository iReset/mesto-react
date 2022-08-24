import {
  popupAddCardSelector,
  popupEditAvatarSelector,
  popupEditProfileSelector,
} from '../utils/constants.js';

function Main() {
  function handleEditAvatarClick() {
    document.querySelector(popupEditAvatarSelector).classList.add('popup_opened');
  };

  function handleEditProfileClick() {
    document.querySelector(popupEditProfileSelector).classList.add('popup_opened');
  };

  function handleAddPlaceClick() {
    document.querySelector(popupAddCardSelector).classList.add('popup_opened');
  };

  return (
    <main className="main">
      <section className="profile root__profile">
        <button
          className="profile__avatar-edit button"
          type="button"
          aria-label="Изменить аватар."
          onClick={handleEditAvatarClick}
        >
          <img className="profile__avatar" src="#" alt="Аватар пользователя." />
        </button>
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <p className="profile__about"></p>
          <button
            className="profile__edit-button button"
            type="button"
            aria-label="Редактировать."
            onClick={handleEditProfileClick}
          ></button>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          aria-label="Добавить."
          onClick={handleAddPlaceClick}
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
