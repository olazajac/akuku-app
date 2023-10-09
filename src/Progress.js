export function Progress({ testQuestions }) {
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
