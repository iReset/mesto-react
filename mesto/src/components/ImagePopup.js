function ImagePopup(props) {
  const openClass = props.card ? 'popup_opened' : '';
  const link = props.card && props.card.link;
  const alt = props.card && props.card.alt;

  return (
    <div className={`popup popup_type_open-image ${openClass}`}>
      <figure className="popup__container popup__container_type_image">
        <div className="popup__image-block">
          <button
            className="popup__close-button button"
            type="button"
            aria-label="Закрыть изображение."
            onClick={props.onClose}
          ></button>
          <img className="popup__image" src={link} alt={alt} />
        </div>
        <figcaption className="popup__caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
