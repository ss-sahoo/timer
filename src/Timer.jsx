import "./Timer.css";

import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };
  const handlePlayPauseTimer = () => {
    if (time > 0 && !isStarted) {
      setIsRunning(true);
      setIsStarted(true);
    } else {
      setIsPaused(!isPaused);
    }
  };
  const handleResetTimer = () => {
    setIsRunning(false);
    setTime(startTime);
    setIsStarted(false);
    setIsPaused(false);
  };
  const handleNumberInput = (e) => {
    const inputTime = e.target.value;
    const numberValue = inputTime.replace(/\D/g, "");
    const newTime = numberValue === "" ? 0 : parseInt(numberValue) * 60;
    if (isStarted && newTime !== startTime) {
      setIsRunning(false);
      setIsStarted(false);
      setIsPaused(false);
    }

    setTime(newTime);
    setStartTime(newTime);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  return (
    <div className="timer-container">
      <div className="input-time">
        <p>Enter Minutes</p>
        <input
          type="text"
          name="input-time"
          id="input-time"
          onChange={handleNumberInput}
        />
      </div>
      <div className="timer">
        <div className="play-icon" onClick={handlePlayPauseTimer}>
          {isRunning && !isPaused ? <FaCirclePause /> : <FaCirclePlay />}
        </div>
        <div className="timer-text">
          <p>{formatTime(time)}</p>
        </div>
        <button className="reset-button" onClick={handleResetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
