import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  function handleNameChange(e) {
    console.log(e.target.value)
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      ariaLabel="Закрыть форму ввода."
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
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
