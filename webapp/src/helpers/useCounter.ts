import { useEffect, useRef, useState } from "react";

export const useCounter = (countDownTime = 5, onEnd?: () => void) => {
  const intervalId = useRef<NodeJS.Timer>();
  const COUNTDOWNSTATUS = {
    pause: 0,
    start: 1,
    default: 2,
    reset: 3,
    restart: 4,
  };
  let [countdownTimer, setCountdownTimer] = useState(countDownTime);

  const [countdownStatus, setCountdownStatus] = useState(
    COUNTDOWNSTATUS.default
  );
  const startCountdown = () => setCountdownStatus(COUNTDOWNSTATUS.start);
  const pauseCountdown = () => setCountdownStatus(COUNTDOWNSTATUS.pause);
  const resetCountdown = () => setCountdownStatus(COUNTDOWNSTATUS.reset);
  const restartCountdown = () => setCountdownStatus(COUNTDOWNSTATUS.restart);

  useEffect(() => {
    switch (countdownStatus) {
      case COUNTDOWNSTATUS.start:
        intervalId.current = setInterval(() => {
          setCountdownTimer((prevValue) => {
            const newValue = prevValue - 1;
            if (onEnd && newValue === 0) onEnd();

            if (newValue <= 0) clearInterval(intervalId.current);
            return newValue;
          });
        }, 1000);
        break;
      case COUNTDOWNSTATUS.pause:
        clearInterval(intervalId.current);
        break;
      case COUNTDOWNSTATUS.reset:
        clearInterval(intervalId.current);
        setCountdownTimer(countDownTime);
        break;
      case COUNTDOWNSTATUS.restart:
        clearInterval(intervalId.current);
        setCountdownTimer(countDownTime);
        setCountdownStatus(() => COUNTDOWNSTATUS.start);
        break;
      default:
        break;
    }
  }, [
    COUNTDOWNSTATUS.pause,
    COUNTDOWNSTATUS.reset,
    COUNTDOWNSTATUS.restart,
    COUNTDOWNSTATUS.start,
    countDownTime,
    countdownStatus,
    onEnd,
  ]);

  return {
    countdownTimer,
    startCountdown,
    pauseCountdown,
    resetCountdown,
    restartCountdown,
  };
};
