function ImagePopup(props) {
  return (
    <div className="popup popup_type_open-image">
      <figure className="popup__container popup__container_type_image">
        <div className="popup__image-block">
          <button className="popup__close-button button" type="button" aria-label="Закрыть изображение."></button>
          <img className="popup__image" src="#" alt="" />
        </div>
        <figcaption className="popup__caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
