import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import { v4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const isPlayingClickFunc = ()=>{
    let audioClick = document.getElementsByClassName("klik")[0];
    audioClick.pause()
    audioClick.play()
  }
  const isPlayingCorrectFunc = ()=>{
    let audioCorrect = document.getElementsByClassName("korrekt")[0];
    audioCorrect.pause()
    audioCorrect.play()
  }
  const isPlayingInCorrectFunc = ()=>{
    let audioInCorrect = document.getElementsByClassName("inkorrekt")[0];
    audioInCorrect.pause()
    audioInCorrect.play()
  }
  const isPlayingEndFunc = ()=>{
    let audioEnd = document.getElementsByClassName("endSound")[0];
    audioEnd.play()
  }
  

 

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

  // only messages

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
        }
        if (prev > 0) {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const checkMatch = () => {
    const wordToCompare = word[currentWordIndex];
    const doesItMatch = wordToCompare === currentInput.trim().toLowerCase();

    if (doesItMatch) {
      isPlayingCorrectFunc();
      setCorrect(correct + 1);
      correct === 5 && toast.success("Good!", { icon: "🚀" });
      correct === 10 && toast.success("Fine!", { icon: "🚀" });
      correct === 15 && toast.success("Better!", { icon: "🚀" });
      correct === 25 && toast.success("Recommended!", { icon: "🚀" });
      correct === 30 && toast.success("Amazing!", { icon: "🚀" });
      correct === 35 && toast.success("Astonishing!", { icon: "🚀" });
      correct === 38 && toast.success("Cool!", { icon: "🚀" });
      correct === 40 && toast.success("Master!", { icon: "🚀" });
      showResults === "block" &&
        toast.info("Made by Zokikhon!", { icon: "🚀" });

      // let arr = [...word];
      // arr[currentWordIndex] = `${wordToCompare} `
      // setWords(arr)
    } else {
      isPlayingInCorrectFunc();
      setInCorrect(inCorrect + 1);
    }
  };

  const handleKeyDown = ({ keyCode, key }) => {
    // space keyWord
    if (Number(keyCode) === 8) {
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
    if (
      currentWordIndex === wordIdx &&
      letterIdx === currentCharIndex &&
      currentChar &&
      status === "started"
    ) {
      if (letter === currentChar) {
        return "has-background-success";
      } else if (currentChar.toLowerCase() === "backspace") {
        return "has-background-info";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currentWordIndex &&
      currentCharIndex >= word[currentWordIndex].length
    ) {
      return "has-background-danger";
    }
    // else if(wordIdx === currentWordIndex && currentCharIndex === word[currentWordIndex].length) {
    //   return "has-background-info is-info";
    // }
    else {
      return "";
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
  //   isPlayingClick ? klikk.play() : klikk.pause();
  //   isPlayingCorrect ? korrektt.play() : korrektt.pause();
  //   isPlayingInCorrect ? inkorrectt.play() : inkorrectt.pause();
  // }, [
  //   isPlayingClick,
  //   isPlayingCorrect,
  //   isPlayingInCorrect,
  //   klikk,
  //   korrektt,
  //   inkorrectt,
  // ]);


  useEffect(() => {
    if (time === 0) {
      setTimeout(() => {
        isPlayingEndFunc();
      },1000)
      setTimeout(() => {
        toast.info("Made by Zokirkhon!", {
          icon: "🚀",
        });
      }, 1000);
      setTimeout(() => {
        toast.info("Let's try one more time!", {
          icon: "💪",
        });
      }, 7000);
      if (correct <= 10) {
        setTimeout(() => {
          toast.info("Your result is not good!", {
            icon: "💪",
          });
        }, 11000);
        setTimeout(() => {
          toast.info("Try it now again!", {
            icon: "💪",
          });
        }, 16000);
      }
      if (correct >= 10 && correct <= 20) {
        setTimeout(() => {
          toast.info("Your result is not bad!", {
            icon: "💪",
          });
        }, 11000);
        setTimeout(() => {
          toast.info("But You have to train again!", {
            icon: "💪",
          });
        }, 16000);
      }
      if (correct > 20) {
        setTimeout(() => {
          toast.info("Your result is Cool!", {
            icon: "💪",
          });
        }, 11000);
        setTimeout(() => {
          toast.info("Do you want to again?!", {
            icon: "💪",
          });
        }, 16000);
      }
    }
  }, [time, correct, inCorrect]);

  return (
    <div className="App">
     <ToastContainer />
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
              onClick={(e) => {
                setNOfWords(e.target.value);
                isPlayingClickFunc();
              }}
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
              onClick={(e) => {
                setNOfWords(e.target.value);
                isPlayingClickFunc();
              }}
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
              onClick={(e) => {
                setNOfWords(e.target.value);
                isPlayingClickFunc();
              }}
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
              onClick={(e) => {
                setTIme(e.target.value);
                isPlayingClickFunc();
              }}
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
              onClick={(e) => {
                setTIme(e.target.value);
                isPlayingClickFunc();
              }}
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
              onClick={(e) => {
                setTIme(e.target.value);
                isPlayingClickFunc();
              }}
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
        </div>
      </div>
      <div style={{ display: start }} className="section">
        <button onClick={()=> {
          handleStart();
          isPlayingClickFunc();
          }} className="button is-info is-fullwidth">
          Start
        </button>
      </div>
      <div style={{ display: showResults }} className="section">
        <button onClick={()=> {
          handleReStart();
          isPlayingClickFunc();
          }} className="button is-info is-fullwidth">
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
                        className={`${getCharClass(
                          idx,
                          letter,
                          index
                        )} bgStyled`}
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
              {isNaN(Math.round((correct / (correct + inCorrect)) * 100)) ? (
                "0"
              ) : Math.round((correct / (correct + inCorrect)) * 100) >= 90 &&
                correct >= 20 ? (
                <span>
                  {Math.round((correct / (correct + inCorrect)) * 100)}%
                  <p>Awesome!</p>
                </span>
              ) : (
                Math.round((correct / (correct + inCorrect)) * 100)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
