import iconSuccess from "../images/icon__success.svg";
import iconError from "../images/icon__error.svg";
import useClosePopupOnEsc from "../hooks/useClosePopupOnEsc";

export default function InfoTooltip({
  isOpen,
  onClose,
  isAuthStatus,
  message,
}) {
  useClosePopupOnEsc(isOpen, onClose);

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_info">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__info-icon"
          src={isAuthStatus ? iconSuccess : iconError}
          alt="Иконка результата регистрации"
        />
        <p className="popup__info-text">{message.text}</p>
      </div>
    </div>
  );
}
