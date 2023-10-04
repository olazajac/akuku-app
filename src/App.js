import React, { useState } from "react";

const pytaniaUsera = [
  {
    pytanie: "pies",
    odpowiedz: "dog",
  },
  {
    pytanie: "kot",
    odpowiedz: "cat",
  },
  {
    pytanie: "żyrawa",
    odpowiedz: "giraffe",
  },
];

function App() {
  const test = pytaniaUsera;
  const [odpowiedzUsera, setOdpowiedzUsera] = useState("");
  const [curQuestion, setCurQuestion] = useState(0);

  return (
    <div className="App">
      <Pytania test={test} />
      <Button onClick={handleStartTest}>Zacznij test</Button>
      <StrefaTestu
        odpowiedzUsera={odpowiedzUsera}
        onSetOdpowiedzUsera={setOdpowiedzUsera}
        test={test}
        curQuestion={curQuestion}
        setCurQuestion={setCurQuestion}
      />
    </div>
  );
}

export default App;

function StrefaTestu({
  odpowiedzUsera,
  onSetOdpowiedzUsera,
  test,
  curQuestion,
  setCurQuestion,
}) {
  return (
    <>
      <Question
        test={test}
        curQuestion={curQuestion}
        setCurQuestion={setCurQuestion}
      />
      <Input
        odpowiedzUsera={odpowiedzUsera}
        onSetOdpowiedzUsera={onSetOdpowiedzUsera}
      />
      <Button onClick={() => handleCheck(odpowiedzUsera, test, curQuestion)}>
        Sprawdźaaaaaaaaaaaaaa
      </Button>
    </>
  );
}

function Question({ test, curQuestion, setCurQuestion }) {
  return <p>{test[curQuestion].pytanie}</p>;
}

function Pytania({ test }) {
  return (
    <ul>
      {test.map((pytanie) => (
        <Pytanie pytanie={pytanie} key={crypto.randomUUID()} />
      ))}
    </ul>
  );
}

function Pytanie({ pytanie }) {
  return (
    <li>
      {pytanie.pytanie} - {pytanie.odpowiedz}
    </li>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function handleStartTest() {
  console.log("pytaniaUsera");
}

function handleCheck(odpowiedzUsera, pytania, curQuestion) {
  console.log(odpowiedzUsera);
  console.log(pytania[curQuestion].odpowiedz);
  odpowiedzUsera === pytania[curQuestion].odpowiedz
    ? console.log("dobrze")
    : console.log("zle");
}

function Input({ odpowiedzUsera, onSetOdpowiedzUsera }) {
  return (
    <div>
      <input
        type="text"
        value={odpowiedzUsera}
        onChange={(e) => onSetOdpowiedzUsera(e.target.value)}
      />
    </div>
  );
}
