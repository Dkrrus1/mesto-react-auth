import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function DeleteCardPopup({ isOpen, onClose, onCardDelete, isRender }) {
    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(isOpen);
    }
    return (
        <PopupWithForm name={'confirm-card-delete'} title={'Вы уверены?'} isOpened={isOpen.isOpen} submitName={isRender ? 'Удаление...' : 'Да'} onClose={onClose} onSubmit={handleSubmit} />
    )
}