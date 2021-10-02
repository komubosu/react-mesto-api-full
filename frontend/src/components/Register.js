import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register ({ onRegisterUser }) {
  const [ buttonStatus, setButtonStatus] = React.useState('Зарегистрироваться');

  const onSubmit = (password, email) => {
    onRegisterUser(password, email, setButtonStatus)
  }

  return (
    <AuthForm title="Регистрация" buttonStatus={buttonStatus} onSubmit={onSubmit}>
      <p className="register__text" >Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link>
      </p>
    </AuthForm>
  )
}

export default Register