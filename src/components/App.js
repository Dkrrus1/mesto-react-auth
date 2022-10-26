import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup';
import { api } from "../utils/Api";
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext ';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { registerUser, loginUser, getToken } from '../utils/Auth';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState({
    isOpen: false,
    card: {}
  });
  const [isRegisterPopupOpened, setIsRegisterPopupOpened] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [renderLoading, setRenderLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const openProfileEdit = () => { setIsEditProfilePopupOpen(true) };
  const openAvatarEdit = () => { setIsEditAvatarPopupOpen(true) };
  const openPlaceAdd = () => { setIsAddPlacePopupOpen(true) };
  const openCardDelete = (card) => {
    setIsDeleteCardPopupOpen({
      isOpen: true,
      card: card
    })
  };
  const onRenderLoading = () => { setRenderLoading(true) };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen({
      isOpen: false,
      card: {},
    });
    setRenderLoading(false);
    setIsRegisterPopupOpened(false);
    setSelectedCard({});
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleRegister = ({ password, email }) => {
    return registerUser(password, email)
      .then((data) => {
        setIsRegistered(true);
        setIsRegisterPopupOpened(true);
        setUserEmail(data.email);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
        setIsRegisterPopupOpened(true);
      });
  };

  const handleLogin = ({ password, email }) => {
    return loginUser(password, email).then((res) => {
      if (res) {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push('/');
      }
    })
      .catch((err) => {
        console.log(err)
        setIsRegistered(false);
        setIsRegisterPopupOpened(true);
      });
  }

  function handleCardLike(card, isLiked) {
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardDelete(card) {
    onRenderLoading();
    api.deleteCard(card.card.card._id).then(() => {
      setCards((state) => state.filter(c => c._id !== card.card.card._id))
    })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(closeAllPopups())
  }

  function handleUpdateUser(data) {
    onRenderLoading();
    api.setUserData(data).then((newUserInfo) => { setUserInfo(newUserInfo); closeAllPopups() })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleAvatarUpdate(link) {
    onRenderLoading();
    api.setUserAvatar(link).then((newUserInfo) => { setUserInfo(newUserInfo); closeAllPopups() })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handlePlaceAdd(card) {
    onRenderLoading();
    api.addNewPicture(card).then((newCard) => { setCards([newCard, ...cards]); closeAllPopups() })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserInfo(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
}}, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={userInfo}>
        <Header email={userEmail} onLogout={handleLogout} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={openProfileEdit} onAddPlace={openPlaceAdd} onEditAvatar={openAvatarEdit} cards={cards} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={openCardDelete} onRenderLoading={onRenderLoading} />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
          <Route path="*">
            <h1>Страница не найдена!</h1>
          </Route>
          <Footer />
        </Switch>
        <InfoTooltip isOpen={isRegisterPopupOpened} onClose={closeAllPopups} onRegister={isRegistered} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isRender={renderLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} isRender={renderLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPlaceAdd={handlePlaceAdd} isRender={renderLoading} />
        <DeleteCardPopup card={selectedCard} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} isRender={renderLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
