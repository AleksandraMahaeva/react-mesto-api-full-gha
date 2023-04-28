import React from 'react';

function PopupWithForm(props) {
  const { title, name, children, isOpen, onClose, buttonName, onSubmit } = props

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <h2 className="popup__heading">{title}</h2>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button id="edit-profile-button" className="popup__submit" type="submit">
            {buttonName}
          </button>
        </form>
        <button onClick={onClose} id="popup-profile-close-button" className="popup__close-button" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;