import React, { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = (props) => {
    const { isOpen, onClose, onUpdateUser } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser.name, currentUser.about, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm buttonName="Сохранить" name="edit-form" title="Редактировать профиль" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose}>
            <div className="popup__field">
                <input type="text" value={name || ''} onChange={e => setName(e.target.value)} id="author-input" name="name" placeholder="Имя"
                    className="popup__input popup__input_type_author" minLength="2" maxLength="40" required />
                <span className="popup__input-error author-input-error"></span>
            </div>
            <div className="popup__field">
                <input type="text" value={description || ''} onChange={e => setDescription(e.target.value)} id="description-input" name="about" placeholder="О себе"
                    className="popup__input popup__input_type_description" minLength="2" maxLength="200" required />
                <span className="popup__input-error description-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;