import React from "react";
import "./QuestionForm.css";

const QuestionForm = ({
  trivQuestion,
  trivAnswers,
  handleAnswerChange,
  submitAnswer,
  madeChoice
}) => {
  return (
    <div id="question-form">
      <form onSubmit={submitAnswer}>
        <h2>{trivQuestion}</h2>
        <div className="choice-container">
          {trivAnswers.map((answer) => (
            <div className="choice-input" key={answer}>
              <input
                type="radio"
                id={answer}
                value={answer}
                name="trivia-answer"
                onChange={handleAnswerChange}
              />
              <label className="label" htmlFor={answer}>{answer}</label>
            </div>
          ))}
        </div>
        <button className="sub-button" type="submit">Answer...</button>
      </form>
      { madeChoice === false && <p className="choice-error">You didn't select an answer!</p>}
    </div>
  );
};

export default QuestionForm;
