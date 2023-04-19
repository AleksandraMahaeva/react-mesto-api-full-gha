import React from 'react';

function Info(props) {
  const { isSuccess = true } = props
  const message = isSuccess ? 'успех' : 'не успех'
  const iconClass = isSuccess ? 'succsess' : 'failed'
  return (
    <div className="info-popup">
      <div className="info-popup__message">{message}</div>
      <img className={`info-popup__img ${iconClass}`} alt="info" />
    </div>
  );
}

export default Info;