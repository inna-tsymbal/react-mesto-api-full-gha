import { Link } from "react-router-dom";

export default function PageWithForm({
  name,
  onSubmit,
  buttonText,
  title,
  isRegister,
  errors,
  buttonStatus,
  values,
  handleInputChange,
}) {
  return (
    <div className="page-form">
      <h2 className="page-form__title">{title}</h2>
      <form name={name} onSubmit={onSubmit} noValidate>
        <fieldset className="page-form__set">
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Email"
            className={`page-form__input ${
              !errors.email ? "" : "form__input_type_error"
            }`}
            minLength={5}
            maxLength={40}
            required
            value={values.email || ""}
            onChange={handleInputChange}
          />
          <span className="form__input-error email-error">{errors.email}</span>
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className={`page-form__input ${
              !errors.password ? "" : "form__input_type_error"
            }`}
            name="password"
            required
            value={values.password || ""}
            onChange={handleInputChange}
          />

          <span className="form__input-error password-error">
            {errors.password}
          </span>
        </fieldset>
        <button
          className={`page-form__button ${
            buttonStatus ? "" : "page-form__button_disabled"
          }`}
          type="submit"
          disabled={!buttonStatus}
        >
          {buttonText}
        </button>
        {isRegister && (
          <p className="page-form__redirect">
            Уже зарегистрированы?
            <Link
              to="/sign-in"
              className="page-form__redirect page-form__redirect_active"
            >
              {" Войти"}
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
