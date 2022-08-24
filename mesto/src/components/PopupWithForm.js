function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button className="popup__close-button button" type="button" aria-label={props.ariaLabel}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form  popup__${props.name}`} id={props.name} name={props.name}>
          {props.children}
          <button className="popup__save-button button" type="submit">{props.textButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
