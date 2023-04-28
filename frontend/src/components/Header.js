import React from 'react';
import imgLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ email, isRegistr, onSignOut }) {
    return (
        <header className="header">
            <img alt="место Россия" src={imgLogo} className="header__logo" />
            {email && <div>
                {email}
                <button className='button_exit' onClick={onSignOut}>Выйти</button>
            </div>
            }
            {!email && isRegistr && <Link to="/sign-in" className="popup__login-entrance">Войти</Link>}
            {!email && !isRegistr && <Link to="/sign-up" className="popup__login-entrance">Зарегистрироваться</Link>}
        </header>
    );
}

export default Header;