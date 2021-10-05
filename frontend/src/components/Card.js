import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes.some(i => i === currentUser._id)

  const hanldeClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <button onClick={handleDeleteClick} className={`card__del-btn ${isOwn? 'card__del-btn_visible' : ''}`} type="button"></button>
      <img src={card.link} alt={card.name} className="card__image" onClick={hanldeClick} />
      <div className="card__info">
        <p className="card__title">{card.name}</p>
        <button onClick={handleLikeClick} className={`card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`} type="button">
          <p className="card__like-counter">{card.likes.length}</p>
        </button>
      </div>
    </div>
  );
}

export default Card;