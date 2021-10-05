import React from "react";

function AuthForm ({ title, buttonStatus, children, onSubmit }) {
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password, email);
  }

  return (
      <form onSubmit={handleSubmit} className="form form_auth">
        <h1 className="form__title form__title_auth" >{title}</h1>
        <div className="form__input form__input_auth">
          <div className="form__field form__field_auth">
            <input onChange={handleChangeEmail} value={email} placeholder="Email" className="form__text form__text_auth" required type="email" minLength="2"></input>
          </div>
          <div className="form__field form__field_auth">
            <input onChange={handleChangePassword} value={password} placeholder="Пароль" className="form__text form__text_auth" required type="text" minLength="6"></input>
          </div>
        </div>
        <button type="submit" className="form__submit-btn form__submit-btn_auth">{buttonStatus}</button>
        {children}
      </form>
  );
}

export default AuthForm;