function ImagePopup({ card, isOpen, onClose }) {

  return (
    <div id="popupCardImg" className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={(evt) => {(evt.target === evt.currentTarget) && onClose()}}>
      <div className="popup__container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
        <button name="closePopupButton" type="button" className="popup__close-btn" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup