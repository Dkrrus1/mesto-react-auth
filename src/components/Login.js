import React from "react";
import { withRouter, useHistory } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin({ email, password })
        .then(() => {
          setEmail('');
          setPassword('');
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    };
    return (
        <form className="auth-form" name="login-form" method="post" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Вход</h2>
            <input type="email" name="email" id="user-email" className="auth-form__input" placeholder="Email"
                minLength="4" maxLength="80" value={email} onChange={({ target }) => setEmail(target.value)} required />
            <input type="password" name="password" id="user-password" className="auth-form__input" placeholder="Пароль"
                minLength="4" maxLength="80" value={password} onChange={({ target }) => setPassword(target.value)} required />
            <button type="submit" className="auth-form__submit" aria-label="Войти">Войти</button>
        </form>
    )
}

export default withRouter(Login);