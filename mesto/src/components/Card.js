function Card(props) {
  function handleClick() {
    props.onCardClick(props.link);
  }

  return (
    <li className="element">
      <div className="element__image-container">
        <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
      </div>
      <button className="element__remove-button button" type="button" aria-label="Удалить."></button>
      <div className="element__info">
        <h2 className="element__caption">{props.name}</h2>
        <div className="element__like">
          <button className="element__like-button button" type="button" aria-label="Нравится."></button>
          <p className="element__like-quantity">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
