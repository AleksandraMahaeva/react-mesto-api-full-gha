import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Registr from './Registr';
import Login from './Login';
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltipPopup from "./InfoTooltip";
import * as auth from '../utils/auth.js';

const errorText = 'Что-то пошло не так! Попробуйте ещё раз.'
const successRegisterText = 'Вы успешно зарегестрировались!'

const App = () => {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [infoText, setInfoText] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getCreateCard()])
        .then(([user, initialCards]) => {
          setCurrentUser(user);
          setCards(initialCards)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setInfoTooltipPopupOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(isLiked, card._id)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
    .then(() => {
      setCurrentUser({ ...currentUser, name: userInfo.name, about: userInfo.about });
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(avatarInfo) {
    api.updateAvatar(avatarInfo)
    .then(() => {
      setCurrentUser({ ...currentUser, avatar: avatarInfo.avatar });
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddCard(card) {
    api.setCreateCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function openInfoTooltipPopup(isSuccess, text) {
    setIsSuccess(isSuccess);
    setInfoText(text)
    setInfoTooltipPopupOpen(true);
  }

  function handleLogin(email, password, clearForm) {
    auth.authorize(email, password)
    .then((data) => {
      localStorage.setItem('token', data.token);
      clearForm()
      setLoggedIn(true)
      navigate('/', { replace: true })
    })
    .catch((err) => {
      console.log(err);
      openInfoTooltipPopup(false, errorText)
    })
  }

  function handleRegister(email, password ) {
    auth.register(email, password)
    .then((res) => {
      openInfoTooltipPopup(true, successRegisterText)
    })
    .catch((err) => {
      console.log(err);
      openInfoTooltipPopup(false, errorText)
    })
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function onSignOut() {
    const token = localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  function onCloseToolTipPopup() {
    //при успешной регистрации показывается попап успеха(по дизайну) и на его закрытие происходит редирект на страницу входа
    if (isSuccess) {
      closeAllPopups()
      navigate('/sign-in', { replace: true })
    } else closeAllPopups()
  }

  const Home = ((props) => {
    return (<>
      <Header email={email} onSignOut={onSignOut} />
      <Main
        {...props}
        onEditProfile={setEditProfilePopupOpen}
        onAddPlace={setAddPlacePopupOpen}
        onEditAvatar={setEditAvatarPopupOpen}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
    </>)
  })
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={Home} loggedIn={loggedIn} />} />
          <Route exact path="/sign-in" element={
            <>
              <Header />
              <Login handleLogin={handleLogin} />
            </>
          } />
          <Route exact path="/sign-up" element={
            <>
              <Header isRegistr />
              <Registr onRegister={handleRegister} />
            </>
          } />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} currentUser={currentUser} />
        <ImagePopup card={selectedCard} isOpen={selectedCard} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
        <PopupWithForm buttonName="Да" name="confirmation-form" title="Вы уверены?">
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltipPopup isOpen={isInfoTooltipPopupOpen} onClose={onCloseToolTipPopup} isSuccess={isSuccess} text={infoText}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;