import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name.trim(),
      about: about.trim(),
    });
  }

  React.useEffect(_ => {
    if (props.isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      ariaLabel="Закрыть форму ввода."
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input className="popup__input popup__input_type_name" type="text" id="name" name="name" value={name}
          placeholder="Имя" required minLength="2" maxLength="40" onChange={handleNameChange} />
        <span className="popup__input-error" id="name-error" hidden></span>
        <input className="popup__input popup__input_type_about" type="text" id="about" name="about" value={about}
          placeholder="О себе" required minLength="2" maxLength="200" onChange={handleAboutChange} />
        <span className="popup__input-error" id="about-error" hidden></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
