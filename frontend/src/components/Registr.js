
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Auth from './Auth.js';

const Register = ({ openInfoTooltipPopup }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.register(formValue.email, formValue.password).then((res) => {
      if (res.error) {
        openInfoTooltipPopup(false)
      } else openInfoTooltipPopup(true)
    });
  }

  return (
    <div className="popup__register">
      <p className="popup__register-header">
        Регистрация
      </p>
      <form className="register__form" onSubmit={handleSubmit} >
        <input className="popup__input popup__input_black-theme" placeholder="Email" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} />
        <input className="popup__input popup__input_black-theme" placeholder="Пароль" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} />
        <div className="popup__register-button">
          <button type="submit" onSubmit={handleSubmit} className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="popup__login-block">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="popup__login-entrance">Войти</Link>
      </div>
    </div>
  );
}

export default Register;