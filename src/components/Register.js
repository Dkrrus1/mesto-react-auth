import React from "react";
import { withRouter, Link } from "react-router-dom";

const Register = ({ onRegister }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister({ email, password });
    };

    return (
        <form className="auth-form" name="register-form" method="post" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Регистрация</h2>
            <input type="email" name="email" id="user-email" className="auth-form__input" placeholder="Email"
                minLength="4" maxLength="80" value={email} onChange={({ target }) => setEmail(target.value)} required />
            <input type="password" name="password" id="user-password" className="auth-form__input" placeholder="Пароль"
                minLength="4" maxLength="80" value={password} onChange={({ target }) => setPassword(target.value)} required />
            <button type="submit" className="auth-form__submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
            <Link to="/sign-in" className="auth-form__login">Уже зарегистрированы? Войти</Link>
        </form>
    )
}

export default withRouter(Register);