export function Intro({ phase, testQuestions, handleStart }) {
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
