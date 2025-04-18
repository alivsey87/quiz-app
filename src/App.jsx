import { useState } from "react";
import MainForm from "./MainForm";
import QuestionForm from "./QuestionForm";
import Results from "./Results";
import HomePage from "./HomePage";

function App() {
  const [userInput, setUserInput] = useState({
    name: "",
    category: "",
    difficulty: "",
  });
  const [trivData, setTrivData] = useState();
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isCooled, setIsCooled] = useState(true);
  const [trivQuestion, setTrivQuestion] = useState("");
  const [trivAnswers, setTrivAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [formError, setFormError] = useState("");
  const [madeChoice, setMadeChoice] = useState(null);
  const [trivFetchError, setTrivFetchError] = useState("");
  const [view, setView] = useState("home");

  const formValidation = () => {
    if (userInput.name.trim() === "") {
      setHasError(true);
      setFormError("We don't know your name!");
      return false;
    } else if (userInput.category === "" || userInput.difficulty === "") {
      setHasError(true);
      setFormError("You must finish your selections!");
      return false;
    }
    setHasError(false);
    setFormError("");
    return true;
  };

  const handleEnter = () => {
    setView("main");
  };

  const handleNameChange = (event) => {
    setUserInput((prev) => ({ ...prev, name: event.target.value }));
    setHasError(false);
    setFormError("");
  };

  const handleCategoryChange = (event) => {
    setUserInput((prev) => ({ ...prev, category: event.target.value }));
    setHasError(false);
    setFormError("");
  };

  const handleDifficultyChange = (event) => {
    setUserInput((prev) => ({ ...prev, difficulty: event.target.value }));
    setHasError(false);
    setFormError("");
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
    setMadeChoice(true);
  };

  const coolDown = () => {
    setTimeout(() => {
      setIsEnabled(true);
      setIsCooled(true);
    }, 5000);
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
      setMadeChoice(null);
      setView("results");
    }
    else if (selectedAnswer === "") {
      setMadeChoice(false);
      return;
    }
    else {
      setIsCorrect(false);
      setMadeChoice(null);
      setView("results");
    }
  };

  const tryAnother = () => {
    setUserInput({
      ...userInput,
      category: "",
      difficulty: "",
    });
    setSelectedAnswer("");
    setMadeChoice(null);
    setIsCorrect(null);
    setView("main");
  };

  const getTriviaQuestion = async (event) => {
    event.preventDefault();

    if (!formValidation()) {
      return;
    }

    try {
      setIsCorrect(null);
      setTrivFetchError("");
      setIsEnabled(false);
      setIsCooled(false);
      setLoading(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${userInput.category}&difficulty=${userInput.difficulty}&type=multiple`
      );

      if (!response.ok) {
        setLoading(false);
        setIsEnabled(true);
        throw new Error("Failed to retrieve a trivia question!");
      }

      const data = await response.json();
      const questionData = data.results[0];
      const parser = new DOMParser();

      const question = parser.parseFromString(
        questionData.question,
        "text/html"
      ).documentElement.textContent;

      const correct = parser.parseFromString(
        questionData.correct_answer,
        "text/html"
      ).documentElement.textContent;

      const incorrect = questionData.incorrect_answers.map(
        (answer) =>
          parser.parseFromString(answer, "text/html").documentElement
            .textContent
      );
      const allAnswers = [correct, ...incorrect].sort(
        () => Math.random() - 0.5
      );

      setTrivData(data);
      setTrivQuestion(question);
      setTrivAnswers(allAnswers);
      setCorrectAnswer(correct);
      coolDown();
      setLoading(false);
      setView("question");
    } catch {
      setTrivFetchError("So sorry! We couldn't get you a question, try again!");
    }
  };

  return (
    <div>
      {view === "home" && <HomePage onEnter={handleEnter} />}

      {view === "main" && (
        <MainForm
          userInput={userInput}
          handleNameChange={handleNameChange}
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
          getTriviaQuestion={getTriviaQuestion}
          isEnabled={isEnabled}
          isCooled={isCooled}
          formError={formError}
          hasError={hasError}
        />
      )}

      {view === "question" && trivData && (
        <QuestionForm
          trivQuestion={trivQuestion}
          trivAnswers={trivAnswers}
          handleAnswerChange={handleAnswerChange}
          submitAnswer={submitAnswer}
          madeChoice={madeChoice}
        />
      )}

      {view === "results" && isCorrect !== null && (
        <Results
          isCorrect={isCorrect}
          userName={userInput.name}
          tryAnother={tryAnother}
        />
      )}

      <p>{trivFetchError}</p>
    </div>
  );
}

export default App;
