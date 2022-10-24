import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext ";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser, isRender }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm name={'profile-form'} title={'Редактировать профиль'} isOpened={isOpen} submitName={isRender ? 'Сохранение...' : 'Сохранить'} onClose={onClose} onSubmit={handleSubmit}
            children={<>
                <input type="text" name="name" id="profile-name" className="edit-form__name popup__input" placeholder="Имя"
                    minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange} />
                <span className="popup__input-error profile-name-error">Ошибка</span>
                <input type="text" name="about" id="profile-profession" className="edit-form__profession popup__input"
                    placeholder="О себе" minLength="2" maxLength="200" required value={description || ''} onChange={handleDescriptionChange} />
                <span className="popup__input-error profile-profession-error">Ошибка</span>
            </>}
        />
    )
}