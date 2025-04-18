import React from "react";
import "./Results.css";

const Results = ({ isCorrect, userName, tryAnother }) => {
  return (
    <div id="results-sect">
      {isCorrect ? (
        <div className="congrats">
          <h2>Congratulations {userName}!</h2>
          <h3>You are correct!</h3>
        </div>
      ) : (
        <div className="sorry">
          <h2>Sorry {userName}</h2>
          <h3>That is incorrect!</h3>
        </div>
      )}
      <button className="try-button" onClick={tryAnother}>Try another!</button>
    </div>
  );
};

export default Results;
