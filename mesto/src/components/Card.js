function Card(props) {
  if (!props.card) return null;

  const name = props.card.name;
  const link = props.card.link;
  const likes = props.card.likes.length;

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <div className="element__image-container">
        <img className="element__image" src={link} alt={name} onClick={handleClick} />
      </div>
      <button className="element__remove-button button" type="button" aria-label="Удалить."></button>
      <div className="element__info">
        <h2 className="element__caption">{name}</h2>
        <div className="element__like">
          <button className="element__like-button button" type="button" aria-label="Нравится."></button>
          <p className="element__like-quantity">{likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
