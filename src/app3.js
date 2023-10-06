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
    id: 2,
    prev: false,
  },

  {
    question: "3",
    answear: "1",
    done: false,
    id: 3,
    prev: false,
  },
  // {
  //   question: "4",
  //   answear: "1",
  //   done: false,
  //   id: 4,
  //   prev: false,
  // },
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
  const [rand, setRand] = useState(0);
  const [questions, setQuestions] = useState(testQuestions);
  const [curQuestion, setCurQuestion] = useState(rand);
  const [usersTry, setUserstry] = useState("");
  const [points, setPoints] = useState(0);
  const [helper, setHelper] = useState(testQuestions.map((q, i) => i));

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
      questions.map((q) => (q.prev = false));
      questions[curQuestion].prev = true;

      setHelper(
        questions
          .map((q, index) => ({ index, prev: q.prev }))
          .filter((obj) => !obj.prev)
          .map((obj) => obj.index)
      );
    }

    //rand to index kolejnego pytania
    // mozliwe to indexy obiektow kt nie są prev
    // zrob tablice z indexami[0,1,3]
    // wylosuj z nich rand

    setRand(Math.floor(Math.random() * questions.length));

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
                {pyt.prev === true && "xx"} {pyt.question} - id {pyt.id}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <label className="test-question">
              <p>{questions[curQuestion]?.question}</p>

              <p>rand = {rand}</p>
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
