import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export function Header({ onLogout, email }) {
  return (
    <header className="header">
      <a href="https://dkrrus1.github.io/mesto/" className="header__link"><img src={logo} className="header__logo" alt="Логотип" /></a>
      <Switch>
          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link to="/sign-in" className="header__button header__button_logout" onClick={onLogout}>
              Выйти
            </Link>
          </Route>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__button">
              Войти
            </Link>
          </Route>
        </Switch>
    </header>
  )
}