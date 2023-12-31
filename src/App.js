import React, { useState, useEffect, useRef } from "react";
import { Intro } from "./Intro";
import { Progress } from "./Progress";
import { Settings } from "./Points";
import { TestArea } from "./TestArea";
import { AfterBadAnswear } from "./AfterBadAnswear";

const testQuestions = [
  { question: "a", done: false, answear: "1", badanswear: 0 },
  { question: "b", done: false, answear: "1", badanswear: 0 },
  { question: "c", done: false, answear: "1", badanswear: 0 },
  { question: "d", done: false, answear: "1", badanswear: 0 },
  { question: "e", done: false, answear: "1", badanswear: 0 },
];

function App() {
  const [repeats, setRepeats] = useState(true);
  const [swap, setSwap] = useState(true);
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

      setUserstry("");
      // inputRef.current.focus();
      setIsFocused(true);
    }

    if (usersTry !== curQuestion.answear) {
      /////////////////////////////////////////////zle

      setPhase("bad");

      setBadanswear(badanswear + 1);
      curQuestion.badanswear++;

      repeats === "false" &&
        setQuestions(questions.filter((q) => q.badanswear === 0));
    }
    if (questions.length === 1) {
      setPhase("theEnd");

      return;
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
    swap === true &&
      questions.map((q) => {
        let tempa = q.answer;
        let tempq = q.question;

        q.question = tempa;
        q.answer = tempq;
      });

    setPhase("testPhase");
    setCurQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setUserstry("");
  }

  return (
    <div className="App">
      <Settings points={points} />
      <Progress testQuestions={testQuestions} />
      <Intro
        phase={phase}
        testQuestions={testQuestions}
        handleStart={handleStart}
      />

      <TestArea
        handleSubmit={handleSubmit}
        curQuestion={curQuestion}
        quesions={questions}
        phase={phase}
        inputRef={inputRef}
        isFocused={isFocused}
        usersTry={usersTry}
        setUserstry={setUserstry}
      />

      <AfterBadAnswear
        curQuestion={curQuestion}
        usersTry={usersTry}
        phase={phase}
        setPhase={setPhase}
      />

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

export default App;
