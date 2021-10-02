import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [ avatarLink, setAvatarLink ] = React.useState()
  const [ buttonStatus, setButtonStatus ] = React.useState('Сохранить')

  React.useEffect(() => {
    setAvatarLink('');
  }, [isOpen])

  const handleChangeAvatarLink = (e) => {
    setAvatarLink(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink,
    },
    setButtonStatus,
    );
  }

  return (
    <PopupWithForm name="EditAvatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonStatus={buttonStatus}>
      <div className="form__input">
        <div className="form__field">
          <input onChange={handleChangeAvatarLink} placeholder="Ссылка на картинку" type="url" value={avatarLink || ''} className="form__text" required />
          <span className="form__text-error avatar-url-input-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup