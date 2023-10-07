import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleInputChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.job,
    });
  }

  useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      job: currentUser.about,
    });
  }, [currentUser, isOpen, resetForm, setValues]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      buttonStatus={isValid}
    >
      <input
        className={`form__input form__input_profile_name ${
          !errors.name ? "" : "form__input_type_error"
        }`}
        type="text"
        name="name"
        id="name"
        value={values.name || ""}
        onChange={handleInputChange}
        minLength={2}
        maxLength={40}
        required
        placeholder="Имя"
      />
      <span className="form__input-error name-error">{errors.name}</span>
      <input
        className={`form__input form__input_profile_job ${
          !errors.job ? "" : "form__input_type_error"
        }`}
        type="text"
        name="job"
        id="job"
        value={values.job || ""}
        onChange={handleInputChange}
        required
        minLength={2}
        maxLength={200}
        placeholder="О себе"
      />
      <span className="form__input-error job-error">{errors.job}</span>
    </PopupWithForm>
  );
}
