import React from "react";
import classes from "./AnswersList.module.scss";
import AnswerItem from "./AnswersItem/AnswerItem";

const AnswersList = (props) => {
  const { onAnswerClick, state } = props;

  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={onAnswerClick}
            state={state ? state[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
