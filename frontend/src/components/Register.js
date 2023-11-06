import PageWithForm from "./PageWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useEffect } from "react";

export default function Register({ register, isLoggedIn, isLoading }) {
  const { values, handleInputChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    register(values.email, values.password);
  }

  useEffect(() => {
    resetForm();
  }, [isLoggedIn, resetForm]);

  return (
    <PageWithForm
      name="register"
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Регистрация..." : "Зарегистрироваться"}
      title="Регистрация"
      isRegister={true}
      errors={errors}
      buttonStatus={isValid}
      values={values}
      handleInputChange={handleInputChange}
    />
  );
}
