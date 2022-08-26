import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

import api from '../utils/api.js';

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
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

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    stateFormSetters.forEach(setter => setter(false));
    setSelectedCard(null);
  }

  React.useEffect(() => {
    api.loadUserInfo()
      .then(user => setCurrentUser(user))
      .catch(console.log);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        ariaLabel="Закрыть форму ввода."
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
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
      </PopupWithForm>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

      <PopupWithForm
        name="add-card"
        title="Новое место"
        ariaLabel="Закрыть форму ввода."
        buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          <input className="popup__input popup__input_type_title" type="text" id="title" name="title" value=""
            placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__input-error" id="title-error" hidden></span>
          <input className="popup__input popup__input_type_link" type="url" id="link" name="link" value=""
            placeholder="Ссылка на картинку" required />
          <span className="popup__input-error" id="link-error" hidden></span>
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        ariaLabel="Закрыть окно подтверждения."
        buttonText="Да"
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
