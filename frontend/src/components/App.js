import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isCardImpPopupOpen, setIsCardImpPopupOpen ] = React.useState(false);
  const [ isDeletePlacePopupOpen, setIsDeletePlacePopupOpen ] = React.useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [ isRegisterSuccess, setRegisterSuccess] = React.useState(true);
  const [ selectedCard, setSelectedCard ] = React.useState({});
  const [ email, setEmail] = React.useState('');
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ cards, setCards ] = React.useState([]);
  const [ loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setEmail(userData.email)
        setCurrentUser(userData);
      })
      .then(() => setLoggedIn(true))
      .then(() => history.push('/'))
      .catch(err => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards.reverse())
      })
      .catch(err => console.log(err));
  }, []);

  const handleRegisterUser = (email, password, setButtonStatus) => {
    setButtonStatus('Регистрация...')
    api.register(password, email)
      .then(() => setRegisterSuccess(true))
      .then(() => setIsInfoTooltipOpen(true))
      .then(() => history.push('/sign-in'))
      .catch(err => {
        console.log(err)
        setIsInfoTooltipOpen(true)
        setRegisterSuccess(false)
      })
      .finally(() => setButtonStatus('Зарегистрироваться'))
  };

  const handleLogin = (email, password, setButtonStatus) => {
    setButtonStatus('Вход...')
    api.authorize(email, password)
      .then((userData) => setCurrentUser(userData))
      .then(() => setEmail(email))
      .then(() => setLoggedIn(true))
      .then(() => history.push('/'))
      .catch(err => {
        if (err === 401) {
          console.log(err + ' - пользователь с email не найден')
        } else console.log(`Ошибка: ${err}`)
      })
      .finally(() => setButtonStatus('Войти'))
  };

  const handleLogout = (setButtonStatus) => {
    setButtonStatus('Выход...')
    api.signout()
      .then(() => history.push('/sign-in'))
      .catch(err => console.log(err))
      .finally(() => setButtonStatus('Выйти'))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  };

  const handleCardDelete = (setButtonStatus) => {
    setButtonStatus('Удаление...')

    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== selectedCard._id))
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setButtonStatus('Да'))
  };

  const handleUpdateUser = (newUserInfo, setButtonStatus) => {
    setButtonStatus('Сохранение...')

    api.setNewUserInfo(newUserInfo)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => setButtonStatus('Сохранить'))
  };

  const handleUpdateAvatar = (newAvatar, setButtonStatus) => {
    setButtonStatus('Сохранение...')

    api.setNewAvatar(newAvatar)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        setButtonStatus('Сохранить');
      })
  };

  const handleAddPlaceSubmit = (newCard, setButtonStatus, ) => {
    setButtonStatus('Сохранение...')

    api.uploadNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        setButtonStatus('Сохранить');
      })
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsCardImpPopupOpen(true)
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setIsDeletePlacePopupOpen(true)
    setSelectedCard(card);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardImpPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="root">
          <Header email={email} onLogout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              component={Main}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin}/>
            </Route>

            <Route path="/sign-up">
              <Register onRegisterUser={handleRegisterUser} />
            </Route>
          </Switch>
          <Footer />

          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isRegisterSuccess} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onDeletePlace={handleCardDelete} />
          <ImagePopup card={selectedCard} isOpen={isCardImpPopupOpen} onClose={closeAllPopups} />
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;