export function PopupWithForm({name, title, submitName, isOpened, onClose, children, onSubmit}) {
    return (
        <div className={`popup popup_${name} ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__container-close-button" aria-label="Закрыть" onClick={onClose}></button>
                <form className="edit-form" name={name} method="post" onSubmit={onSubmit}>
                    <h3 className="edit-form__title">{title}</h3>
                    {children}
                    <button type="submit" className="edit-form__submit" aria-label={submitName}>{submitName}</button>
                </form>
            </div>
        </div>
    )
}