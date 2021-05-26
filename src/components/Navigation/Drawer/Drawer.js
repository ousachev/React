import React from "react";
import classes from "./Drawer.module.scss";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  { to: "/", label: "Список", exact: true },
  { to: "/auth", label: "Авторизация", exact: false },
  { to: "/quiz-creator", label: "Создать тест", exact: false },
];

const Drawer = (props) => {
  const { onClose, isOpen } = props;

  const clickHandler = () => {
    onClose();
  };

  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  const cls = [classes.Drawer];

  !isOpen && cls.push(classes.close);

  return (
    <React.Fragment>
      {isOpen ? <Backdrop onClick={onClose} /> : null}
      <nav className={cls.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
    </React.Fragment>
  );
};

export default Drawer;
