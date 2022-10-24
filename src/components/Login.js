import React from "react";
import { api } from "../utils/Api";
import { useHistory } from "react-router-dom";

export function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        api.loginUser(email, password)
            .then((response) => {
                try {
                    if (response.status === 200) {
                        return response.json();
                    }
                } catch (e) {

                    return (e)
                }
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    onLogin();
                    history.push('/')
                    return data
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <form className="auth-form" name="login-form" method="post" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Вход</h2>
            <input type="email" name="email" id="user-email" className="auth-form__input" placeholder="Email"
                minLength="4" maxLength="80" value={email} onChange={handleEmailChange} required />
            <input type="password" name="password" id="user-password" className="auth-form__input" placeholder="Пароль"
                minLength="4" maxLength="80" value={password} onChange={handlePasswordChange} required />
            <button type="submit" className="auth-form__submit" aria-label="Войти">Войти</button>
        </form>
    )
}