import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export function Header({ link, linkName, email }) {
  return (
    <header className="header">
      <a href="https://dkrrus1.github.io/mesto/" className="header__link"><img src={logo} className="header__logo" alt="Логотип" /></a>
      <p className='header__email'>email@email.com</p>
      <Link to={link} className='header__button'>{linkName}</Link>
    </header>
  )
}