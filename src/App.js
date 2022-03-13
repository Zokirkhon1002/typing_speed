import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import { v4 } from "uuid";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const [time, setTIme] = useState(60);
  const [nOfWords, setNOfWords] = useState(200);
  const [word, setWords] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedTime, setCheckedTime] = useState(false);
  const [styleName, setStyleName] = useState("none"); // teskarisi
  const [styleName2, setStyleName2] = useState("block"); // teskarisi
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [currentChar, setCurrentChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [showResults, setShowResults] = useState("none");
  const [start, setStart] = useState("block");
  const textInput = useRef(null);

  const handleStart = () => {
    setStyleName("block");
    setStyleName2("none");
    setStatus("started");
    setShowResults("none");
    setStart("none");

    let interval = setInterval(() => {
      setTIme((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setShowResults("block");
          setStyleName("none");
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const checkMatch = () => {
    const wordToCompare = word[currentWordIndex];
    const doesItMatch = wordToCompare === currentInput.trim().toLowerCase();
    
    if (doesItMatch) {
      setCorrect(correct + 1);
      toast.success("Correct!", {
        icon: "🚀",
      });
      // let arr = [...word];
      // arr[currentWordIndex] = `${wordToCompare} `
      // setWords(arr)
    } else {
      setInCorrect(inCorrect + 1);
      toast.error("Incorrect!", {
        icon: "⚠️"
      });
    }
  };

  const handleKeyDown = ({ keyCode, key }) => {
    // space keyWord
    if(Number(keyCode) === 8){
      // alert("backSpace")
      setCurrentCharIndex(currentCharIndex - 1);
      setCurrentChar(key);
    } else if (Number(keyCode) === 32 || Number(keyCode) === 13) {
      checkMatch();
      setCurrentInput("");
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(-1);
    } else {
      setCurrentCharIndex(currentCharIndex + 1);
      setCurrentChar(key);
    }
  };
  const handleReStart = () => {
    setStart("block");
    setStyleName("none");
    setStyleName2("block");
    setTIme(60);
    setNOfWords(200);
    setWords(randomWords(Number(nOfWords)));
    setChecked(false);
    setCheckedTime(false);
    setCurrentInput("");
    setCurrentWordIndex(0);
    setCorrect(0);
    setInCorrect(0);
    setStatus("waiting");
    setShowResults("none");
    setCurrentCharIndex(-1);
  };

  function getCharClass(wordIdx, letter, letterIdx) {
    if (currentWordIndex === wordIdx && letterIdx === currentCharIndex && currentChar && status === "started") {
      if(letter === currentChar){
        return "has-background-success"
      } else if(currentChar.toLowerCase() === "backspace"){
        return "has-background-info"
      }
      else {
        return "has-background-danger"
      }
    }
  }



  useEffect(() => {
    setWords(randomWords(Number(nOfWords)));
  }, [nOfWords]);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("timeSpeed"));
  //   if (savedNotes) {
  //     setWords(savedNotes);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("timeSpeed", JSON.stringify(word));
  // }, [word]);

  return (
    <div className="App">
      <div
        style={{
          display: styleName2,
          border: "2px solid black",
          margin: "5px",
          flexDirection: "row",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "33px" }}>
          Words Limitation
        </h1>
        <p style={{ textAlign: "center", color: checked && "red" }}>
          {checked ? "Selected" : "Default"}: {nOfWords} words .
        </p>
        <p style={{ textAlign: "center", color: checkedTime && "red" }}>
          {checkedTime ? "Selected" : "Default"}: {time} seconds.
        </p>
        <div
          style={{ textAlign: "center" }}
          className="control is-expand section"
        >
          <span style={{ margin: "5px", border: "2px dotted gray" }}>
            <input
              type="radio"
              id="names"
              className="radio"
              value={200}
              name="words"
              onChange={(e) => setChecked(e.target.checked)}
              onClick={(e) => setNOfWords(e.target.value)}
            />
            <label htmlFor="words" style={{ margin: "5px" }}>
              {200} words,
            </label>
          </span>
          <span style={{ border: "2px dotted gray", margin: "5px" }}>
            <input
              type="radio"
              id="names"
              className="radio"
              value={400}
              name="words"
              onChange={(e) => setChecked(e.target.checked)}
              onClick={(e) => setNOfWords(e.target.value)}
            />
            <label htmlFor="words" style={{ margin: "5px" }}>
              {400} words
            </label>
          </span>
          <span style={{ margin: "5px", border: "2px dotted gray" }}>
            <input
              type="radio"
              id="names"
              className="radio"
              value={600}
              name="words"
              onChange={(e) => setChecked(e.target.checked)}
              onClick={(e) => setNOfWords(e.target.value)}
            />
            <label htmlFor="words" style={{ margin: "5px" }}>
              {600} words
            </label>
          </span>
        </div>

        <h1 style={{ textAlign: "center", fontSize: "33px" }}>
          Time Limitation
        </h1>
        <div
          style={{ textAlign: "center" }}
          className="control is-expand section"
        >
          <span style={{ margin: "5px", border: "2px dotted gray" }}>
            <input
              type="radio"
              id="time"
              className="radio"
              value={60}
              name="time"
              onChange={(e) => setCheckedTime(e.target.checked)}
              onClick={(e) => setTIme(e.target.value)}
            />
            <label htmlFor="time" style={{ margin: "5px" }}>
              {60} sec,
            </label>
          </span>
          <span style={{ border: "2px dotted gray", margin: "5px" }}>
            <input
              type="radio"
              id="time"
              className="radio"
              value={60 * 2}
              name="time"
              onChange={(e) => setCheckedTime(e.target.checked)}
              onClick={(e) => setTIme(e.target.value)}
            />
            <label htmlFor="time" style={{ margin: "5px" }}>
              {60 * 2} sec
            </label>
          </span>
          <span style={{ margin: "5px", border: "2px dotted gray" }}>
            <input
              type="radio"
              id="time"
              className="radio"
              value={60 * 3}
              name="time"
              onChange={(e) => setCheckedTime(e.target.checked)}
              onClick={(e) => setTIme(e.target.value)}
            />
            <label htmlFor="time" style={{ margin: "5px" }}>
              {60 * 3} sec
            </label>
          </span>
        </div>
      </div>
      <div
        style={{ display: styleName, fontSize: "33px" }}
        className="is-size1 has-text-centered has-text-primary"
      >
        <h2>{time}</h2>
      </div>
      <div style={{ display: styleName }}>
        <div className="control is-expand section">
          <input
            disabled={status !== "started"}
            placeholder={
              status === "started"
                ? "write below words..."
                : "waiting to click start..."
            }
            value={currentInput}
            onKeyDown={handleKeyDown}
            type="text"
            className="input"
            onChange={(e) => setCurrentInput(e.target.value)}
            ref={textInput}
          />
          <ToastContainer className="foo" icon={false} />
        </div>
      </div>
      <div style={{ display: start }} className="section">
        <button onClick={handleStart} className="button is-info is-fullwidth">
          Start
        </button>
      </div>
      <div style={{ display: showResults }} className="section">
        <button onClick={handleReStart} className="button is-info is-fullwidth">
          restart
        </button>
      </div>
      <div style={{ display: styleName }} className="section">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {word.map((w, idx) => (
                <span key={v4()} style={{ display: "inline" }}>
                  <span>
                    {w.split("").map((letter, index) => (
                      <span
                        className={`${getCharClass(idx, letter, index)} bgStyled`}
                        key={index}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span> </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: showResults }} className="section">
        <div className="columns">
          <div className="column">
            <p className="is-size-5">Words per minute: </p>
            <p className="has-text-primary is-size-1">{correct}</p>
          </div>
          <div className="column">
            <div className="is-size-5">Accuracy:</div>
            <p className="has-text-info is-size-1">
              {isNaN(Math.round((correct / (correct + inCorrect)) * 100))
                ? "0"
                : Math.round((correct / (correct + inCorrect)) * 100)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
