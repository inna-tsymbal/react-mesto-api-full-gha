import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    !isOwn && "card__delete_inactive"
  }`;

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${
    isLiked && "card__button-like_active"
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  function handleClick() {
    onCardClick({name: card.name, link: card.link});
  }

  return (
    <article className="card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__group">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <div className="card__number-like">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}