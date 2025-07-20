import { useEffect, useState } from "react";


export function usePomodoro () {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(25 * 60);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => setRemainingTime(25 * 60);

  useEffect(() => {
    if (isRunning === false) return undefined;
    const intervalId = setInterval(() => {
      setRemainingTime((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  },[isRunning])

  return { isRunning, remainingTime, toggleTimer, resetTimer };
}