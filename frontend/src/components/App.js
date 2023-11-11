import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteImagePopup from "./DeleteImagePopup.js";

import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

import { api } from "../utils/Api.js";
import * as auth from "../utils/Auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";


function App() {
  // создаём пустой массив для карточек, которые придут с сервера
  const [cards, setCards] = useState([]);

 // создаём переменные, отвечающие за видимость попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteImagePopupOpen, setDeleteImagePopupOpen] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  
  const [isAuthStatus, setIsAuthStatus] = useState(false);
  const [isProcessStatus, setIsProcessStatus] = useState(false);

 // создаём стейт-переменную для открытия popupWithImage
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({}); // не знаю что это

  // стейт для отображения e-mail пользователя
  const [userEmail, setUserEmail] = useState("");

  const [popupMessageStatus, setPopupMessageStatus] = useState({ message: "" }); // не знаю что это

  // записываем хук в переменную для получения доступа к его свойствам
  const navigate = useNavigate();

  //создаём стейт для проверки пользователя на авторизацию
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   checkToken();
  // }, [])
  
  useEffect(() => {
    isLoggedIn && 
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
  }, [isLoggedIn]);

  // const checkToken = () => {
  //   const jwt = localStorage.getItem('jwtM');
  //   if (jwt) {
  //     auth.checkToken()
  //     .then((res) => {
  //       if (res) {
  //         setIsLoggedIn(true);
  //         navigate("/", {replace: true})
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // }

  const handleRegister = (email, password) => {
    setIsProcessStatus(true);
    auth.register(email, password)
      .then((res) => {
        setIsAuthStatus(true);
        navigate("/sign-in", { replace: true });
        setPopupMessageStatus({
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        setPopupMessageStatus({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsAuthStatus(false);

      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsProcessStatus(false);
      });
  }

  const handleLogin = (email, password) => {
    setIsProcessStatus(true);
    auth.login(email, password)
      .then((res) => {
        (true);
        setUserEmail(email);
        navigate("/", { replace: true });
        // localStorage.setItem('jwt', res.token);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthStatus(false);
        setPopupMessageStatus({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsProcessStatus(false));
  }

  const handleSignOut = () => {
    auth.logout()
    .then(() => {
      setIsLoggedIn(false);
      setUserEmail('');
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteImageClick = (card) => {
    setDeleteImagePopupOpen(card);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsProcessStatus(true);
    api
      .patchUserInfo({ name, about })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessStatus(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsProcessStatus(true);
    api
      .patchUserAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessStatus(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsProcessStatus(true);
    api
      .postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessStatus(false);
      });
  };

  const handleCardDelete = (card) => {
    setIsProcessStatus(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessStatus(false);
      });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeleteImagePopupOpen({});
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} logout={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                Component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleDeleteImageClick}
                onCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                register={handleRegister}
                isLoggedIn={isLoggedIn}
                isLoading={isProcessStatus}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                login={handleLogin}
                isLoggedIn={isLoggedIn}
                isLoading={isProcessStatus}
              />
            }
          />
        </Routes>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isProcessStatus}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isProcessStatus}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isProcessStatus}
        />

        <DeleteImagePopup
          card={isDeleteImagePopupOpen}
          onClose={closeAllPopups}
          title="Вы уверены?"
          onCardDelete={handleCardDelete}
          isLoading={isProcessStatus}
          buttonTextLoading="Удаление..."
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isAuthStatus={isAuthStatus}
          message={popupMessageStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
