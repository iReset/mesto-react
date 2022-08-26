function ImagePopup(props) {
  const openClass = props.card ? 'popup_opened' : '';
  // тут тоже не пойму. && - это логическая операция.
  // props.card && 'popup_opened'
  // вернет либо второй операнд, т.е. в данном случае 'popup_opened',
  // либо первый, если он при приведении к логическому типу дает falsе
  // в моем случае при отсутствии card возвращается null
  // если когда-нибудь будет css-класс null, то будет нехорошо
  const link = props.card?.link;
  const alt = props.card?.alt;

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
