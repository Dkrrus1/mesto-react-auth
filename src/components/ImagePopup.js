export function ImagePopup ({ card, onClose }) {
    return (
        <div className={`popup popup_big-image ${card.name ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_image">
          <button type="button" className="popup__container-close-button" aria-label="Закрыть" onClick={onClose}></button>
          <div className="image-container">
            <img src={`${card.link}`} alt={`Увеличенная картинка карточки ${card.name}`} className="image-container__image" />
            <h2 className="image-container__title">{card.name}</h2>
          </div>
        </div>
      </div>
    )
}