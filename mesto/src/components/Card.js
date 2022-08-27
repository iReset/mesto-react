import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  if (!props.card) return null;

  const { name, link, likes, owner } = props.card;

  const isOwn = currentUser && currentUser._id === owner._id;
  const isLiked = currentUser && likes.some(i => i._id === currentUser._id);
  const likeButtonActiveClassName = isLiked ? props.options.likeButtonActiveClassName : '';

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleRemoveClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <div className="element__image-container">
        <img className="element__image" src={link} alt={name} onClick={handleClick} />
      </div>
      <button
        className="element__remove-button button"
        type="button"
        hidden={!isOwn}
        aria-label="Удалить."
        onClick={handleRemoveClick}
      ></button>
      <div className="element__info">
        <h2 className="element__caption">{name}</h2>
        <div className="element__like">
          <button
            className={`element__like-button button ${likeButtonActiveClassName}`}
            type="button"
            aria-label="Нравится."
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-quantity">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
