import React, { useState } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js";

const Auth = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    email: {
      value: "",
      type: "email",
      label: "Email",
      errorMessage: "Введите корректный email",
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: "",
      type: "password",
      label: "Пароль",
      errorMessage: "Введите корректный пароль",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (e, controlName) => {
    const formControlsObj = { ...formControls };
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControlsObj[controlName] = control;

    let isFormValid = true;

    Object.keys(formControlsObj).forEach((name) => {
      isFormValid = formControlsObj[name].valid && isFormValid;
    });

    setFormControls(formControlsObj);
    setIsFormValid(isFormValid);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(e) => onChangeHandler(e, controlName)}
        />
      );
    });
  };

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}

          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>

          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!state.isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
