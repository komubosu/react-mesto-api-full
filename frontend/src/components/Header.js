import React from "react";
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo__header.svg';

function Header({ email, onLogout }) {
  const [ buttonStatus, setButtonStatus ] = React.useState('Выйти')

  const handleLogout = () => {
    onLogout(setButtonStatus);
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место." />
      <Route exact path="/">
        <div className="header__info">
          <p className="header__text">{email}</p>
          <button className="header__button" onClick={handleLogout}>{buttonStatus}</button>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Route>
    </header>
  );
}

export default Header;