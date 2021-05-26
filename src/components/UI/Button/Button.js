import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => {
  const { type, disabled, children, onClick } = props;

  const cls = [classes.Button, classes[type]];

  return (
    <button onClick={onClick} className={cls.join(" ")} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
