function PopupWithForm(props) {
  const openClass = props.isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_type_${props.name} ${openClass}`}>
      <div className="popup__container">
        <button
          className="popup__close-button button"
          type="button"
          aria-label={props.ariaLabel}
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form  popup__${props.name}`} id={props.name} name={props.name}>
          {props.children}
          <button className="popup__save-button button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
