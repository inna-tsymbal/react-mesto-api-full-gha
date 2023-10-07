import useClosePopupOnEsc from "../hooks/useClosePopupOnEsc";

export default function ImagePopup({ card, onClose }) {
  useClosePopupOnEsc(card.link, onClose);

  return (
    <div className={`popup popup_image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_image">
        <button
          className="popup__close-button popup__close-button_image"
          type="button"
          onClick={onClose}
        />
        <img className="popup__picture" src={card.link} alt={card.name} />
        <p className="popup__picture-title">{card.name}</p>
      </div>
    </div>
  );
}
