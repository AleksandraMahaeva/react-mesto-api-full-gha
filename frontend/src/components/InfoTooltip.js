import React from 'react';
import Union2 from "../images/Union (2).svg";
import Union1 from "../images/Union (1).svg";

const InfoTooltipPopup = ({ isSuccess, onClose, isOpen }) => {
  return (
    <div id="popup-info-tooltip" className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__tooltip">
        {isSuccess &&
          <>
            <div><img src={Union1} alt="галочка успешной регистрации" /></div>
            <div>Вы успешно<br />зарегестрировались!</div>
          </>
        }
        {!isSuccess &&
          <>
            <div><img src={Union2} alt="крестик ошибки регистрации" /></div>
            <div>Что-то пошло не так!<br />Попробуйте ещё раз.</div>
          </>
        }
        <button onClick={onClose} id="popup-img-zoom-close-button" className="popup__close-button" type="button"></button>
      </div>
    </div>
  );
}

export default InfoTooltipPopup;