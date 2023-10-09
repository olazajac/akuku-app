import React, { useState, useEffect, useRef } from "react";
import { testQuestions } from "./App";

export function App() {
  const [questions, setQuestions] = useState(testQuestions);
  const [curQuestion, setCurQuestion] = useState(null);

  const [usersTry, setUserstry] = useState("");
  const [points, setPoints] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [badanswear, setBadanswear] = useState(0);
  const [doneTest, setDoneTest] = useState([]);
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef(null);

  // Obsługa zdarzenia keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (phase === "bad") {
        setUserstry("");
        setPhase("testPhase");
      }
    }
  };

  // Dodajmy obsługę keydown przy załadowaniu komponentu
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase]);

  function handleSubmit(e) {
    e.preventDefault();

    if (usersTry.length === 0) {
      return;
    }
    if (usersTry === curQuestion.answear) {
      /////////////////////////////////////////////dobrze
      const updatedCurQuestion = { ...curQuestion };

      setDoneTest([...doneTest, updatedCurQuestion]);

      curQuestion.done = true;
      setQuestions(questions.filter((q) => q !== curQuestion));
      setPoints(points + 1);

      if (questions.length === 1) {
        setPhase("theEnd");

        return;
      }
      setUserstry("");
      inputRef.current.focus();
    }

    if (usersTry !== curQuestion.answear) {
      /////////////////////////////////////////////zle
      console.log("zle");
      setPhase("bad");

      setBadanswear(badanswear + 1);
      curQuestion.badanswear++;
    }

    let randomNumber;

    if (questions.length > 1) {
      do {
        if (questions.length > 4) {
          randomNumber = questions[Math.floor(Math.random() * 4)];
        }
        if (questions.length <= 4) {
          randomNumber =
            questions[Math.floor(Math.random() * questions.length)];
        }
      } while (randomNumber === curQuestion); // Upewnij się, że wylosowana liczba jest różna od poprzedniej}
    }
    if (questions.length === 1) {
      randomNumber = questions[0];
    }

    setCurQuestion(randomNumber);
  }

  function handleStart() {
    setPhase("testPhase");
    setCurQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setUserstry("");
  }

  function Settings() {
    return (
      <div className="settings">
        <p className="points">{points}</p>
      </div>
    );
  }

  function Progress() {
    return (
      <div className="progress">
        {testQuestions
          .sort((a, b) => b.done - a.done)
          .map((it) => (
            <div
              className="innerprogress"
              style={{
                width: `${100 / testQuestions.length}%`,
                background: `${it.done ? "green" : "yellow"}`,
              }}
            ></div>
          ))}
      </div>
    );
  }

  function Intro() {
    return (
      <>
        {phase === "intro" && (
          <div>
            <ul className="q-list">
              {testQuestions.map((item) => (
                <li>
                  {item.question} {!item.done ? "" : "👍"}
                </li>
              ))}
            </ul>
            <button onClick={handleStart}>Zacznij Test</button>
          </div>
        )}{" "}
      </>
    );
  }

  return (
    <div className="App">
      <Settings />
      <Progress />
      <Intro />

      {phase === "testPhase" && (
        <div className="testArea">
          <form onSubmit={handleSubmit}>
            <label className="test-question">
              <p>
                {curQuestion
                  ? curQuestion.question
                  : `${questions.length} nie ma curquestion`}
              </p>
            </label>

            <input
              ref={inputRef}
              autoFocus={isFocused}
              type="text"
              value={usersTry}
              onChange={(e) => setUserstry(e.target.value)}
            />
            <button>Sprawdź</button>
          </form>
        </div>
      )}

      {phase === "bad" && (
        <div onClick={() => setPhase("testPhase")}>
          <p className="points"> {curQuestion.answear}</p>
          <p className="points"> {usersTry}</p>
        </div>
      )}

      {phase === "theEnd" && (
        <div>
          <p className="text-base text-blue-600 md:text-green-600 text-center">
            Good answears: {points}
          </p>
          <p className="text-lg	text-center">Bad answears: {badanswear}</p>
          <p className="text-4xl text-center">
            Percentage: {Math.round((points * 100) / (points + badanswear))}
          </p>
        </div>
      )}
    </div>
  );
}
