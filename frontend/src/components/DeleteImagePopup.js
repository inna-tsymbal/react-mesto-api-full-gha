export default function DeleteImagePopup({
  card,
  onClose,
  title,
  onCardDelete,
  isLoading,
  buttonTextLoading,
}) {
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className={`popup popup_delete ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_delete">
        <button
          onClick={onClose}
          className="popup__close-button popup__close-button_delete"
          type="button"
        />
        <h3 className="popup__title popup__title_delete">{title}</h3>
        <button
          onClick={handleDeleteClick}
          className="popup__delete-button"
          type="submit"
        >
          {isLoading ? buttonTextLoading : "Да"}
        </button>
      </div>
    </div>
  );
}
