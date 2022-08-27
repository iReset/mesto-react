import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: linkRef.current.value.trim(),
    });
  }

  React.useEffect(_ => {
    if (props.isOpen) {
      linkRef.current.value = currentUser.avatar;
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      ariaLabel="Закрыть форму ввода."
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input popup__input_type_link"
          type="url"
          id="avatar_link"
          name="avatar_link"
          placeholder="Ссылка на аватар"
          ref={linkRef}
          required />
        <span className="popup__input-error" id="avatar_link-error" hidden></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
