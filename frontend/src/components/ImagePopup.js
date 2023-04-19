import React from 'react';

const ImagePopup = ({ card, onClose, isOpen }) => {
  const { name, link } = card || {}
  return (
    <div id="popup-img-zoom" className={`popup popup_zoom ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_zoom">
        <figure className="popup__figure">
          <img src={link} className="popup__image" alt={name} />
          <figcaption className="popup__caption">{name}</figcaption>
        </figure>
        <button onClick={onClose} id="popup-img-zoom-close-button" className="popup__close-button" type="button"></button>
      </div>
    </div>
  );
}

export default ImagePopup;