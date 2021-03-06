import React from "react";
import AuthForm from "./AuthForm";

function Login ({ onLogin }) {
  const [ buttonStatus, setButtonStatus] = React.useState('Войти');

  const onSubmit = (password, email) => {
    onLogin(email, password, setButtonStatus)
  }

  return (
    <AuthForm title="Вход" buttonStatus={buttonStatus} onSubmit={onSubmit} />
  )
}

export default Login;