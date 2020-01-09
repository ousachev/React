import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {}, // {[id]: success error}
    activeQuestion: 0,
    isFinished: false,
    answerState: null, // { [id]: 'success' 'error' }
    quiz: [
      {
        question: "Год основания Самары",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "1520", id: 1 },
          { text: "1586", id: 2 },
          { text: "1650", id: 3 },
          { text: "1750", id: 4 }
        ]
      },
      {
        question: "Сколько этажей имеет самое высокое здание Самары?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: "22", id: 1 },
          { text: "23", id: 2 },
          { text: "29", id: 3 },
          { text: "31", id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: { [answerId]: "success" },
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  componentDidMount() {
    console.log("Quiz ID=", this.props.match.params.id);
  }

  render() {
    const {
      quiz,
      activeQuestion,
      isFinished,
      results,
      answerState
    } = this.state;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {isFinished ? (
            <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
