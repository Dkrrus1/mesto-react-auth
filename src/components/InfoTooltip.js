import success from '../images/success.svg';
import error from '../images/error.svg';
import { Link } from 'react-router-dom';

export function InfoTooltip({ isOpened, onClose, isRegistered }) {
    return (
        <div className={`popup popup_infotooltip ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_infotooltip">
                <Link to={'/sign-in'}  className="popup__container-close-button" aria-label="Закрыть" onClick={onClose}></Link>
                <img src={isRegistered ? success : error} className="infotooltip__image" alt={isRegistered ? 'успешная регистрация' : 'ошибка регистрации'} />
                <h2 className="infotooltip__title">{isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
}