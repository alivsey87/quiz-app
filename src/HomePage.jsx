import React from "react";
import './HomePage.css'

const HomePage = ({ onEnter }) => {
  return (
    <div id="home-page">
      <h1>Welcome to the Trivia App</h1>
      <p>Test your knowledge with fun and challenging trivia questions!</p>
      <button className="button-home" onClick={onEnter}>
        Enter
      </button>
    </div>
  );
}

export default HomePage;