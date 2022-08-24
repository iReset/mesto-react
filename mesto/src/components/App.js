import React from 'react';

import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const stateFormSetters = [setAddPlacePopupOpen, setEditAvatarPopupOpen, setEditProfilePopupOpen];

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    stateFormSetters.forEach(setter => setter(false));
  }

  return (
    <>
      <Header />
      <Main
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        ariaLabel="Закрыть форму ввода."
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="popup__fieldset">
            <input
              className="popup__input popup__input_type_link"
              type="url"
              id="avatar_link"
              name="avatar_link"
              value=""
              placeholder="Ссылка на аватар"
              required />
            <span className="popup__input-error" id="avatar_link-error" hidden></span>
          </fieldset>
        }
      />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        ariaLabel="Закрыть форму ввода."
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="popup__fieldset">
            <input className="popup__input popup__input_type_name" type="text" id="name" name="name" value=""
              placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__input-error" id="name-error" hidden></span>
            <input className="popup__input popup__input_type_about" type="text" id="about" name="about" value=""
              placeholder="О себе" required minLength="2" maxLength="200" />
            <span className="popup__input-error" id="about-error" hidden></span>
          </fieldset>
        }
      />

      <PopupWithForm
        name="add-card"
        title="Новое место"
        ariaLabel="Закрыть форму ввода."
        buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="popup__fieldset">
            <input className="popup__input popup__input_type_title" type="text" id="title" name="title" value=""
              placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__input-error" id="title-error" hidden></span>
            <input className="popup__input popup__input_type_link" type="url" id="link" name="link" value=""
              placeholder="Ссылка на картинку" required />
            <span className="popup__input-error" id="link-error" hidden></span>
          </fieldset>
        }
      />

      <ImagePopup />

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <button className="popup__close-button button" type="button" aria-label="Закрыть окно подтверждения."></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="popup__form  popup__confirm" id="confirm" name="confirm">
            <button className="popup__save-button button" type="submit">Да</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
