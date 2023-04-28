import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
    const { isOpen, onClose, onAddCard } = props
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddCard({
            name,
            link: url,
        });
    }

    return (
        <PopupWithForm buttonName="Создать" name="add-form" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit} >
            <div className="popup__field">
                <input type="text" id="card-name-input" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Название"
                    className="popup__input popup__input_type_card-name" minLength="2" maxLength="30" required />
                <span className="popup__input-error card-name-input-error"></span>
            </div>
            <div className="popup__field">
                <input id="card-link-input" name="link" placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_card-link" value={url} onChange={e => setUrl(e.target.value)} type="url" required />
                <span className="popup__input-error card-link-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;