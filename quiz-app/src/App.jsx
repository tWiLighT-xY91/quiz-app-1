import React, { useState } from "react";

// Space quiz questions (10)
const QUESTIONS = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    answer: 1,
  },
  {
    question: "Which celestial body defines a year on Earth?",
    options: ["The Moon", "The Sun", "The Milky Way", "The Earth"],
    answer: 1,
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
    answer: 1,
  },
  {
    question: "What type of celestial object is the Sun?",
    options: ["Planet", "Star", "Asteroid", "Comet"],
    answer: 1,
  },
  {
    question: "Which planet has the most moons?",
    options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
    answer: 1,
  },
  {
    question: "What is a light-year a measure of?",
    options: ["Time", "Distance", "Mass", "Temperature"],
    answer: 1,
  },
  {
    question: "Which planet is famous for its rings?",
    options: ["Neptune", "Jupiter", "Saturn", "Uranus"],
    answer: 2,
  },
  {
    question: "Who was the first human to walk on the Moon?",
    options: [
      "Yuri Gagarin",
      "Buzz Aldrin",
      "Neil Armstrong",
      "Michael Collins",
    ],
    answer: 2,
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Alpha Centauri", "The Sun", "Betelgeuse", "Sirius"],
    answer: 1,
  },
];

// Colors for the options by CSS class suffix to match CSS
const OPTION_COLORS = ["option-0", "option-1", "option-2", "option-3"];

function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [swipeClass, setSwipeClass] = useState(""); // for swipe animation

  // Start quiz after entering name
  const startQuiz = () => {
    if (name.trim().length === 0) {
      alert("Please enter your name to start the quiz.");
      return;
    }
    setStarted(true);
  };

  // Handle option selection
  const onSelectOption = (idx) => {
    if (selected !== null) return; // Prevent multiple clicks

    setSelected(idx);

    if (idx === QUESTIONS[currentQ].answer) {
      setScore((prev) => prev + 1);
      setSwipeClass("swipe-out-right");
    } else {
      setSwipeClass("swipe-out-left");
    }

    // Move to next question or finish quiz after animation
    setTimeout(() => {
      setSwipeClass("");
      setSelected(null);
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setQuizEnded(true);
      }
    }, 550);
  };

  // Restart the quiz
  const restartQuiz = () => {
    setName("");
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setQuizEnded(false);
    setSwipeClass("");
  };

  // End quiz: attempt to close window
  const endQuiz = () => {
    alert("Thanks for playing! Attempting to close the window.");
    window.close();
  };

  // Render the start screen (name input)
  if (!started) {
    return (
      <main className="start-screen" role="main" aria-label="Start screen">
        <h1>Space Quiz</h1>
        <input
          type="text"
          aria-label="Enter your name"
          placeholder="Enter your name"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") startQuiz();
          }}
        />
        <button
          onClick={startQuiz}
          aria-label="Start quiz button"
          type="button"
        >
          Start Quiz
        </button>
      </main>
    );
  }

  // Render the score/end screen
  if (quizEnded) {
    return (
      <section
        className="score-screen"
        role="main"
        aria-label="Quiz finished screen"
      >
        <h2>Congratulations, {name}!</h2>
        <p>
          Your score is {score} out of {QUESTIONS.length}.
        </p>
        <button
          onClick={restartQuiz}
          aria-label="Restart quiz button"
          type="button"
        >
          Restart Quiz
        </button>
        <button onClick={endQuiz} aria-label="End quiz button" type="button">
          End Quiz
        </button>
      </section>
    );
  }

  // Render the current question card
  const questionObj = QUESTIONS[currentQ];

  return (
    <section
      key={currentQ}
      className={`quiz-card ${swipeClass}`}
      role="main"
      aria-live="polite"
      aria-label={`Question ${currentQ + 1} of ${QUESTIONS.length}`}
    >
      <h2>{questionObj.question}</h2>
      <div className="options" role="list">
        {questionObj.options.map((option, idx) => {
          let classNames = `option ${OPTION_COLORS[idx]}`;
          if (selected === idx) classNames += " selected";
          if (selected !== null) classNames += " disabled";

          return (
            <button
              key={idx}
              className={classNames}
              onClick={() => onSelectOption(idx)}
              disabled={selected !== null}
              role="listitem"
              aria-pressed={selected === idx}
              tabIndex={selected !== null ? -1 : 0}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default App;
