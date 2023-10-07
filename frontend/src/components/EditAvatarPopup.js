import { useEffect } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Обновление..." : "Обновить"}
      buttonStatus={isValid}
    >
      <input
        className={`form__input form__input_avatar_link ${
          !errors.avatar ? "" : "form__input_type_error"
        }`}
        type="url"
        name="avatar"
        id="avatar"
        minLength={2}
        value={values.avatar || ""}
        required
        placeholder="Ссылка на картинку"
        onChange={handleInputChange}
      />
      <span className="form__input-error avatar-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}
