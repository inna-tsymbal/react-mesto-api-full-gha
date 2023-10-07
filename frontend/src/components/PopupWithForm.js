import useClosePopupOnEsc from "../hooks/useClosePopupOnEsc";

export default function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children,
  buttonStatus,
}) {
  useClosePopupOnEsc(isOpen, onClose);

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          className={`form form_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            disabled={!buttonStatus}
            className={`form__button ${
              buttonStatus ? "" : "form__button_disabled"
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
