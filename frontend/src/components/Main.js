import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete } = props
  const currentUser = useContext(CurrentUserContext);//подписка на контекст
  const { name, about, avatar } = currentUser;

  return (
    <main>
      <section className="profile">
        <span onClick={onEditAvatar} className="profile__avatar-edit"></span>
        <img alt={name} src={avatar} className="profile__avatar" />
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__author">{name}</h1>
            <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
          </div>
          <h2 className="profile__description">{about}</h2>
        </div>
        <button onClick={onAddPlace} className="profile__add-button" type="button"></button>
      </section>
      <section className="mapping">
        {cards.map(item => <Card key={item._id} card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />)}
      </section>
    </main>
  );
}

export default Main;