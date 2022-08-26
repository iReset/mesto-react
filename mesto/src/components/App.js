import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
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
  const [cards, setCards] = React.useState([]);
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

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function closeAllPopups() {
    stateFormSetters.forEach(setter => setter(false));
    setSelectedCard(null);
  }

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

  function handleCardDelete(card) {
    if (!currentUser)
      return;

    api.deleteCard(card._id)
      .then(_ => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(console.log);
  }
  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then(result => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  React.useEffect(() => {
    api.loadCards()
      .then(_cards => setCards(_cards))
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    api.loadUserInfo()
      .then(user => setCurrentUser(user))
      .catch(console.log);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />

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
