import React, { useState, useEffect } from "react";

const testQuestions = [
  {
    question: "1",
    answear: "1",
    done: false,
    id: 1,
    prev: false,
  },

  {
    question: "2",
    answear: "1",
    done: false,
    id: 1,
    prev: false,
  },

  {
    question: "3",
    answear: "1",
    done: false,
    id: 3,
    prev: false,
  },
  {
    question: "4",
    answear: "1",
    done: false,
    id: 4,
    prev: false,
  },
  // {
  //   question: "5",
  //   answear: "1",
  //   done: false,
  //   id: 5,
  //   prev: false,
  // },
  // {
  //   question: "6",
  //   answear: "1",
  //   done: false,
  //   id: 6,
  //   prev: false,
  // },
];

function App() {
  let rand = 0;
  const [questions, setQuestions] = useState("");
  const [curQuestion, setCurQuestion] = useState(rand);
  const [usersTry, setUserstry] = useState("");
  const [points, setPoints] = useState(0);
  const [tempq, setTempq] = useState(0);

  function randomQuestion() {
    if (questions.length > 4) {
      rand = Math.floor(Math.random() * 4);
    } else {
      rand = Math.floor(Math.random() * (questions.length - 1));
    }
    setCurQuestion(null);
    setCurQuestion(rand);
  }

  useEffect(() => {
    console.log("dddddddddddddddddddddddddddddddd");
    console.log(questions[rand]);
    console.log(questions[rand] === tempq);
    while (questions[rand] === tempq) {
      if (questions.length > 4) {
        rand = Math.floor(Math.random() * 4);
      } else {
        rand = Math.floor(Math.random() * questions.length);
      }
    }
  }, [tempq]);

  function handleSubmit(e) {
    e.preventDefault();

    // if (usersTry.length < 1) {
    //   return;
    // }

    if (usersTry === questions[curQuestion].answear) {
      questions[curQuestion].done = true;
      setQuestions(questions.filter((q) => !q.done));
      setPoints(points + 1);
    } else {
      setTempq(questions[curQuestion]);
      console.log(tempq);
    }
    setCurQuestion(1);
    setCurQuestion(rand);

    setUserstry("");
  }

  function handleStart() {
    setQuestions(testQuestions);
    setUserstry("");
  }

  return (
    <div className="App">
      <div className="settings">
        <p className="points">{points}</p>
      </div>

      <div className="progress">
        {testQuestions.map((it) => (
          <div
            className="innerprogress"
            style={{
              width: `${100 / testQuestions.length}%`,
              background: `${it.done ? "green" : "yellow"}`,
            }}
          ></div>
        ))}
      </div>
      {questions.length === 0 && (
        <div>
          <ul className="q-list">
            {testQuestions.map((pyt) => (
              <li>
                {pyt.question} {!pyt.done ? "" : "👍"}
              </li>
            ))}
          </ul>
          <button onClick={handleStart}>Zacznij Test</button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="testArea">
          <ul className="q-list">
            {questions.map((pyt) => (
              <li>
                {pyt.question} - id {pyt.id}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <label className="test-question">
              <p>{questions[curQuestion]?.question}</p>
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
