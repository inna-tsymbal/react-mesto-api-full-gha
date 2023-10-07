import { useEffect } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.title,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Создание..." : "Создать"}
      buttonStatus={isValid}
    >
      <input
        className={`form__input form__input_card_name ${
          !errors.title ? "" : "form__input_type_error"
        }`}
        type="text"
        name="title"
        id="title"
        value={values.title || ""}
        onChange={handleInputChange}
        minLength={2}
        maxLength={30}
        required
        placeholder="Название"
      />
      <span className="form__input-error title-error">{errors.title}</span>
      <input
        className={`form__input form__input_card_link ${
          !errors.link ? "" : "form__input_type_error"
        }`}
        type="url"
        name="link"
        id="link"
        value={values.link || ""}
        onChange={handleInputChange}
        minLength={2}
        required
        placeholder="Ссылка на картинку"
      />
      <span className="form__input-error link-error">{errors.link}</span>
    </PopupWithForm>
  );
}
