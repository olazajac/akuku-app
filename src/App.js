import React, { useState } from "react";

const testQuestions = [
  { question: "a", done: false, answear: "1", badanswear: 0 },
  { question: "b", done: false, answear: "1", badanswear: 0 },
  { question: "c", done: false, answear: "1", badanswear: 0 },
  { question: "d", done: false, answear: "1", badanswear: 0 },
  { question: "e", done: false, answear: "1", badanswear: 0 },
];

function App() {
  const [questions, setQuestions] = useState(testQuestions);
  const [curQuestion, setCurQuestion] = useState(null);
  const [prevQuestion, setPrevQuestion] = useState(null);
  const [usersTry, setUserstry] = useState("");
  const [points, setPoints] = useState(0);
  const [started, setStarted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setUserstry("");

    if (usersTry === curQuestion.answear) {
      /////////////////////////////////////////////dobrze

      curQuestion.done = true;

      setQuestions(questions.filter((q) => q !== curQuestion));
      setPoints(points + 1);

      if (questions.length === 1) {
        setStarted(false);
        return;
      }
    }

    if (usersTry !== curQuestion.answear) {
      /////////////////////////////////////////////zle
      console.log("zle");
      curQuestion.badanswear++;
      console.log(curQuestion.badanswear);
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

    setPrevQuestion(curQuestion);
    setCurQuestion(randomNumber);
  }

  function handleStart() {
    setStarted(true);
    setCurQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setUserstry("");
  }

  return (
    <div className="App">
      <div className="settings">
        <p className="points">{points}</p>
      </div>

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
      {!started && (
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
      )}

      {started && (
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
              type="text"
              value={usersTry}
              onChange={(e) => setUserstry(e.target.value)}
            />
            <button>Sprawdź</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
