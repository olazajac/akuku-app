export function AfterBadAnswear({ curQuestion, usersTry, phase, setPhase }) {
  return (
    <>
      {phase === "bad" && (
        <div onClick={() => setPhase("testPhase")}>
          <p className="points"> {curQuestion.answear}</p>
          <p className="points"> {usersTry}</p>
        </div>
      )}
    </>
  );
}
