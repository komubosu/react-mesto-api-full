import successIcon from '../images/SuccessIcon.svg'
import failIcon from '../images/FailIcon.svg'

function InfoTooltip ({ isOpen, onClose, isSuccess }) {

  return (
    <div id="popupAuthStatus" className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={(evt) => {(evt.target === evt.currentTarget) && onClose()}}>
      <div className="popup__container popup__container_auth">
        <img className="popup__image popup__image_auth" src={isSuccess ? successIcon : failIcon} alt={isSuccess ? 'Удачно' : 'Ошибка'}/>
        <p className="popup__text">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button name="closePopupButton" type="button" className="popup__close-btn" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;