import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
    const { isOpen, onClose, onUpdateAvatar } = props
    const linkAvatarRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: linkAvatarRef.current.value
        });
    }

    return (
        <PopupWithForm buttonName="Сохранить" name="edit-avatar" title="Обновить аватар?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <div className="popup__field">
                <input id="avatar-link-input" name="link" placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_avatar-link" type="url"
                    ref={linkAvatarRef} required />
                <span className="popup__input-error avatar-link-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;