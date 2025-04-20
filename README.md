
# Open Trivia Database Quiz App

---
---

## Simple trivia app using the [Open Trivia Database](opentdb.com) API.

---
---

## TABLE OF CONTENTS

1. [App](#1-app)

2. [Home Page](#2-home-page)

3. [Main Form](#3-main-form)

4. [Question Form](#4-question-form)

5. [Results](#5-results)

6. [CSS Styling](#6-css-styling)

---
---

## 1. App

The main parent component holding all the state variables related to the fetching of data from the API and renders the complete UI including four other components: [Home Page](#2-home-page), [Main Form](#3-main-form), [Question Form](#4-question-form), and [Results](#5-results). The only prop passed down to HomePage is `onEnter` which calls the `handleEnter()` function to display the main form page. The `MainForm()` component is passed the majority of the props: `userInput`, `handleNameChange`, `handleCategoryChange`, `handleDifficultyChange`, `getTriviaQuestion`, `isEnabled`, `isCooled`, `formError`, and `hasError`. The `QuestionForm()` component is passed: `trivQuestion`, `trivAnswers`, `handleAnswerChange`, `submitAnswer`, and `madeChoice`. And finally, the `Results()` component is passed `isCorrect`, `userName` and `tryAnother`.

The main function of this entire app is the asynchronous `getTriviaQuestion()`:

```jsx
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
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${userInput.category}&difficulty=${userInput.difficulty}&type=multiple`
      );

      if (!response.ok) {
        setIsEnabled(true);
        throw new Error("So sorry! We couldn't get you a question, try again!");
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
      setView("question");
    } catch (error) {
      setTrivFetchError(error.message);
    }
  };
```

When called, it immediately prevents default form submission behavior before validating the form. Then it tries to fetch data from the [Open Trivia API](opentdb.com). If the response code is ok, the data is first parsed as JSON and then parsed again because some of the strings included html entities. These are saved in the appropriate variables and the app goes to the Question form to display the data! I added a `coolDown()` function because I kept running into errors not realizing (I had to read the API documentation to figure this out) that every IP is only allowed data every 5 seconds! So, even though the page changes, I disabled the button that fetches the trivia for  seconds. I conditionally render all components based on the correct "view" in logical order and also only if there is no error.

```jsx
 return (
    <div>
      {trivFetchError ? (
        <p>{trivFetchError}</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
```

---
---

## 2. Home Page

The landing page that simply introduces the Trivia App. Added consistent styling starting here that gives a fun vibe with eye-catching colors, and a satisfying UI with hover, focus and active effects on all interactive elements.

---
---

## 3. Main Form

The `MainForm()` component is where the user starts entering the required information to start the trivia. Most of the props are passed to this component to receive the values stored in the `userInput` state variable and apply the appropriate functions to make an API fetch with the given data (except for the name). This is a form with a text input, 2 dropdowns and a submit button. It utilizes custom form validation to ensure correct operation. This part is interesting:

```jsx
<button className="sub-button" type="submit" disabled={!isEnabled}>
          {isCooled ? "Get Trivia!" : "Cooling..."}
        </button>
```

This was only included because there is a 5 second wait before you can request more data from this API.

---
---

## 4. Question Form

This is where the actual data from the API is displayed! The props passed to this component handle this data (the question and the answers). It also has some validation to ensure the user actually selects an answer. The array of questions is mapped over and a `<div>` containing a radio input with label is rendered for each question in the array. I've included some awesome custom CSS styling for the radio checkmarks to keep the color theme consistent.

---
---

## 5. Results

This component simply displays the results of the submitted answer. It's passed props to display the users name, determine if their answer is correct, and a handler for "trying another" button.

---
---

## 6. CSS Styling

I had a lot of fun styling this app. The main theme centered around these two colors:

```css
--yellow: rgb(241, 241, 108);
```

```css
background: radial-gradient( rgb(123, 40, 156), rgb(55, 55, 136) 90%);
```

The buttons were all styled the same with hover and active effects, ensuring the transitions were smooth. I added in some fade-in animations for each page to make the transition smooth. Every input element was styled to not include any default styling and really give the app a custom look.


[back to top](#open-trivia-database-quiz-app)
