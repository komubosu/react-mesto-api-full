function PopupWithForm({ name, title, isOpen, onClose, onSubmit, buttonStatus, children }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={(evt) => {(evt.target === evt.currentTarget) && onClose()}}>
      <div className="popup__container">
        <form onSubmit={onSubmit} className="form" name={`form${name}`} >
          <p className="form__title">{title}</p>
          {children}
          <button type="submit" className={`form__submit-btn`}>{buttonStatus}</button>
        </form>
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm