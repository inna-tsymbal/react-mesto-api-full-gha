import logo from "../images/header__logo.svg";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header({ email, logout }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {isPopupOpen && location.pathname === "/" && (
        <div className="header__popup">
          <p className="header__popup__email">{email}</p>
          <Link to="/sign-in" className="header__popup__link" onClick={logout}>
            Выйти
          </Link>
        </div>
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип проекта" />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email">{email}</p>
                <Link
                  to="/sign-in"
                  className="header__link header__link_logout"
                  onClick={logout}
                >
                  Выйти
                </Link>
                <div
                  className={`header__menu ${
                    isPopupOpen ? "header__menu_open" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  <span className="header__menu_line"></span>
                  <span className="header__menu_line"></span>
                  <span className="header__menu_line"></span>
                </div>
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
}
