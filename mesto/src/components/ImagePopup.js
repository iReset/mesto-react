function ImagePopup(props) {
  let openClass = '';
  if (props.card && props.card.length > 0)
    openClass = 'popup_opened';

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
          <img className="popup__image" src={props.card} alt={props.alt} />
        </div>
        <figcaption className="popup__caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
