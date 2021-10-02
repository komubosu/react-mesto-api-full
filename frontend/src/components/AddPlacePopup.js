import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [ cardName, setCardName ] = React.useState()
  const [ cardLink, setCardLink ] = React.useState()
  const [buttonStatus, setButtonStatus] = React.useState('Сохранить')

  React.useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [isOpen])

  const handleChangeCardName = (e) => {
    setCardName(e.target.value)
  }

  const handleChangeCardLink = (e) => {
    setCardLink(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    },
    setButtonStatus,
    );
  }

  return (
    <PopupWithForm name="AddPlace" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonStatus={buttonStatus} >
      <div className="form__input">
        <div className="form__field">
          <input onChange={handleChangeCardName} placeholder="Название" type="text" value={cardName || ''} name="inputCardName" className="form__text" required minLength="2" maxLength="30" />
          <span className="form__text-error cardname-input-error"></span>
        </div>
        <div className="form__field">
          <input onChange={handleChangeCardLink} placeholder="Ссылка на картинку" type="url" value={cardLink || ''} name="inputCardLink" className="form__text" required />
          <span className="form__text-error url-input-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup