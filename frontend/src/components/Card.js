import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
    const { name, link, likes } = card
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `card__del-button ${isOwn ? '' : 'card__del-button_invisible'}`
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-quantity ${isLiked ? 'like_active' : ''}`

    return (
        <article className="card">
            <button className={cardDeleteButtonClassName} type="button" onClick={() => onCardDelete(card._id)}></button>
            <img src={link} className="card__image" alt={name} onClick={() => onCardClick(card)} />
            <div className="card__info">
                <h2 className="card__title">{name}</h2>
                <span className="card__like-quantity-info">
                    <span className={cardLikeButtonClassName} type="button" onClick={() => onCardLike(card)}
                    ></span>
                    <span className="card__like-quantity-number">{likes.length}</span>
                </span>
            </div>
        </article>
    );
}

export default Card;