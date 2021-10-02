import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [ name, setName ] = React.useState()
  const [ description, setDescription ] = React.useState()
  const [ buttonStatus, setButtonStatus ] = React.useState('Сохранить')

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    }, setButtonStatus);
  }

  return (
    <PopupWithForm name="EditProfile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonStatus={buttonStatus} /* isDisabled={isDisabled} */>
      <div className="form__input">
        <div className="form__field">
          <input onChange={handleChangeName} type="text" value={name || ''} placeholder="Имя" className="form__text" required minLength="2" maxLength="40" />
          <span className="form__text-error name-input-error"></span>
        </div>
        <div className="form__field">
          <input onChange={handleChangeDescription} type="text" value={description || ''} placeholder="Обо мне" className="form__text" required minLength="2" maxLength="200" />
          <span className="form__text-error subname-input-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup