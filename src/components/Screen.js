import React, { useState, useEffect } from "react";
import "../styles/Screen.css";
import { Words } from "../assets/Words";

function Screen(props) {
  const [data, setData] = useState([]);
  const [segmentData, setSegmentData] = useState([]);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const bufferData = [];
    for (let i = 0; i < 50; i++) {
      bufferData.push(Words[Math.floor(Math.random() * Words.length)]);
    }
    setData(bufferData);
    document.getElementById("main-input").focus();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const bufferSegmentData = [];
    var counter = 0;

    while (counter + 10 <= data.length) {
      const rowData = [];
      for (let i = counter; i < counter + 10; i++) rowData.push(data[i]);
      bufferSegmentData.push(rowData);
      counter += 10;
    }

    console.log(bufferSegmentData);
    setSegmentData(bufferSegmentData);
  }, [data]);

  useEffect(() => {
    if (props.time === 0) {
      if (timer) clearInterval(timer);
      if (score * 2 > Number(localStorage.getItem("HIGHSCORE"))) {
        window.alert(`Time up! New High Score -> WPM: ${score * 2}`);
        localStorage.setItem("HIGHSCORE", (score * 2).toString());
        window.location = "/";
      } else {
        window.alert(`Time up! Your Score -> WPM: ${score * 2}`);
        window.location = "/";
      }
    }
  }, [props.time, score, timer]);

  function handleInput(event) {
    if (!running) {
      setRunning(true);
      setTimer(setInterval(() => props.setTime((prev) => prev - 1), 1000));
    }
    if (event.target.value.slice(-1) === " ") {
      const x = Math.floor(counter / 10);
      const y = counter % 10;
      const rowContainer = document.getElementsByClassName(x)[0];
      const valueDiv = rowContainer.childNodes[y];
      if (input === data[counter]) {
        setScore((prev) => prev + 1);
        valueDiv.style.backgroundColor = "rgb(4, 120, 3)";
        setInput("");
        setCounter((prev) => prev + 1);
      } else {
        valueDiv.style.backgroundColor = "red";
      }
    } else setInput(event.target.value);
  }

  return (
    <>
      <div id="screen-container">
        {segmentData.map((row, rowIndex) => (
          <div key={rowIndex} className={rowIndex + " screen-row"}>
            {row.map((value, valueIndex) => (
              <div id={valueIndex} key={valueIndex} className="display-value">
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          id="main-input"
          placeholder="Start Typing Here"
          autoComplete="off"
          value={input}
          onChange={handleInput}
        ></input>
      </div>
    </>
  );
}

export default Screen;
