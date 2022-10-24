import React from "react";
import { PopupWithForm } from "./PopupWithForm";


export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isRender }) {
    const avatarInput = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatarInput.current.value });
    }
    return (
        <PopupWithForm name={'confirm-avatar-change'} title={'Обновить аватар'} isOpened={isOpen} submitName={isRender ? 'Сохранение...' : 'Сохранить'} onClose={onClose} onSubmit={handleSubmit} >

            <input type="url" name="avatar" id="avatar-url" className="edit-form__profession popup__input"
                placeholder="Ссылка на аватар" required ref={avatarInput} />
            <span className="popup__input-error avatar-url-error">Ошибка</span>

        </PopupWithForm>
    )
}