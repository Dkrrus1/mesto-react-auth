import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip({ isOpen, onClose, onRegister }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_infotooltip">
                <button type="button" className="popup__container-close-button" aria-label="Закрыть" onClick={onClose}></button>
                <img src={onRegister ? success : error} className="infotooltip__image" alt={onRegister ? 'успешная регистрация' : 'ошибка регистрации'} />
                <h2 className="infotooltip__title">{onRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;