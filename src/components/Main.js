import React from "react"
import { Card } from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext ";

export function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile-container">
                    <img src={`${currentUser.avatar}`} alt="Аватар профиля" className="profile__image" />
                    <button type="button" className="profile__button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить фото" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                <div className="cards__grid">
                    {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
                </div>
            </section>
        </main>
    )
}