export function TestArea({
  handleSubmit,
  curQuestion,
  questions,
  phase,
  inputRef,
  isFocused,
  usersTry,
  setUserstry,
}) {
  return (
    <>
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
    </>
  );
}
