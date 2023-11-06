import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import DeleteImagePopup from "./DeleteImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/Auth.js";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleteImagePopupOpen, setDeleteImagePopupOpen] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [userEmail, setUserEmail] = useState("");
  const [popupMessageStatus, setPopupMessageStatus] = useState({ message: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthStatus, setIsAuthStatus] = useState(false);
  const [isProcessStatus, setIsProcessStatus] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  useEffect(() => {
    checkToken();
  }, [])
  
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          console.log(userData, cards);
          setCurrentUser(userData);
          setCards(cards);
          setUserEmail(userData.email);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate("/", {replace: true})
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);
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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

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

  const handleUpdateUser = (data) => {
    setIsProcessStatus(true);
    api
      .patchUserInfo(data)
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

  const handleUpdateAvatar = (data) => {
    setIsProcessStatus(true);
    api
      .patchUserAvatar(data)
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

  const handleAddPlaceSubmit = (data) => {
    setIsProcessStatus(true);
    api
      .postNewCard(data)
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

  function handleRegister(email, password) {
    setIsProcessStatus(true);
    auth.register(email, password)
      .then(() => {
        setIsAuthStatus(true);
        navigate("/sign-in", { replace: true });
        setPopupMessageStatus({
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        console.log(err);
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

  function handleLogin(email, password) {
    setIsProcessStatus(true);
    auth.login(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate("/", { replace: true });
        localStorage.setItem('jwtM', data.token);
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

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setDeleteImagePopupOpen({});
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} logout={handleSignOut} />
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
