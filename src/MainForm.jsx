import React from "react";
import "./MainForm.css";

const MainForm = ({
  userInput,
  handleNameChange,
  handleCategoryChange,
  handleDifficultyChange,
  getTriviaQuestion,
  isEnabled,
  isCooled,
  formError,
  hasError
}) => {
  return (
    <div id="main-form">
      <form className="form-container" onSubmit={getTriviaQuestion}>
        <label className="label" htmlFor="fname">
          First Name:
        </label>
        <input
          className="name-input"
          id="fname"
          type="text"
          value={userInput.name}
          onChange={handleNameChange}
        />

        <label className="label" htmlFor="category">
          Category:
        </label>
        <select
          className="select-input"
          name="category"
          id="category"
          value={userInput.category}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select...
          </option>
          <option value="12">Music</option>
          <option value="15">Video Games</option>
          <option value="21">Sports</option>
          <option value="25">Art</option>
        </select>

        <label className="label" htmlFor="difficulty">
          Difficulty:
        </label>
        <select
          className="select-input"
          name="difficulty"
          id="difficulty"
          value={userInput.difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="" disabled>
            Select...
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button className="sub-button" type="submit" disabled={!isEnabled}>
          {isCooled ? "Get Trivia!" : "Cooling..."}
        </button>
      </form>
      { hasError && <p className="form-error">{formError}</p>}
    </div>
  );
};

export default MainForm;
