import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext ";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__trash-button ${isOwn ? 'card__trash-button_visible' : 'card__trash-button_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
    );
    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick () {
        onCardLike(card, isLiked)
    }
    function handleDeleteClick () {
        onCardDelete({
            card: card,
        });
    }
    return (
        <div className="card">
            <img src={card.link} className="card__image" alt={card.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить карточку" onClick={handleDeleteClick}></button>
            <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                    <span className="card__like-count">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}