import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      name: title.trim(),
      link: link.trim(),
    });
  }

  React.useEffect(_ => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      ariaLabel="Закрыть форму ввода."
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input className="popup__input popup__input_type_title" type="text" id="title" name="title" value={title}
          placeholder="Название" required minLength="2" maxLength="30" onChange={handleTitleChange} />
        <span className="popup__input-error" id="title-error" hidden></span>
        <input className="popup__input popup__input_type_link" type="url" id="link" name="link" value={link}
          placeholder="Ссылка на картинку" required onChange={handleLinkChange} />
        <span className="popup__input-error" id="link-error" hidden></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
