import React, { useState } from 'react';
import * as auth from '../utils/auth.js';
import { useNavigate } from 'react-router';

const Login = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    props.handleLogin(formValue.email, formValue.password,  () => setFormValue({ email: '', password: '' }));
  }

  return (
    <div className="popup_login">
      <p className="popup__login-header">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="popup__input popup__input_black-theme" type="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange}></input>
        <input className="popup__input popup__input_black-theme" type="password" name="password" placeholder="Пароль" value={formValue.password} onChange={handleChange}></input>
        <button className="popup__login-button" type="submit" onSubmit={handleSubmit}>Войти</button>
      </form>
    </div>
  );
}

export default Login;
