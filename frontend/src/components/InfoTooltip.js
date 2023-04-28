import React from 'react';
import Union2 from "../images/Union (2).svg";
import Union1 from "../images/Union (1).svg";

const InfoTooltipPopup = ({ isSuccess, onClose, isOpen, text }) => {
  return (
    <div id="popup-info-tooltip" className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__tooltip">

        <div><img src={isSuccess ? Union1 : Union2} alt={isSuccess ? "галочка успешной регистрации" : "крестик ошибки регистрации"} /></div>
        <div>{text}</div>
        <button onClick={onClose} id="popup-img-zoom-close-button" className="popup__close-button" type="button"></button>
      </div>
    </div>
  );
}

export default InfoTooltipPopup;