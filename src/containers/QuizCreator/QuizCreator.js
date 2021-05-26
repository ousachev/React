import React from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";

const QuizCreator = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const addQuestionHandler = () => {};

  const createQuizHandler = () => {};

  return (
    <div className={classes.QuizCreator}>
      <divdiv>
        <h1>Создание теста</h1>
        <form onSubmit={submitHandler}>
          <input type="text" />
          <hr />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />

          <select/>

          <Button type="primary" onClick={addQuestionHandler}>
            Добавить вопрос
          </Button>
          <Button type="success" onClick={createQuizHandler}>
            Создать тест
          </Button>
        </form>
      </divdiv>
    </div>
  );
};

export default QuizCreator;
