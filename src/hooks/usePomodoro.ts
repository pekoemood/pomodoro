import { useEffect, useState } from "react";
import { POMODORO_SESSIONS_UNTIL_LONG_BREAK, POMODORO_WORK_TIME, POMODORO_LONG_BREAK, POMODORO_SHORT_BREAK } from "@/lib/constants";
import { TimeMode } from "@/lib/types";

export function usePomodoro() {
	const [isRunning, setIsRunning] = useState(false);
	const [remainingTime, setRemainingTime] =
		useState<number>(POMODORO_WORK_TIME);
	const [sessionCount, setSessionCount] = useState<number>(0);
  const [mode, setMode] = useState<TimeMode>('work')

	const toggleTimer = () => setIsRunning((prev) => !prev);

	const resetTimer = () => {
		setRemainingTime(POMODORO_WORK_TIME);
		setIsRunning(false);
    setMode('work');
	};


	// タイマー処理のuseEffect
	useEffect(() => {
		if (!isRunning) return;

		const intervalId = setInterval(() => {
			setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [isRunning]);

	// 完了判定のuseEffect
	useEffect(() => {
		if (remainingTime === 0 && isRunning) {
      if (mode === 'work') {
        setSessionCount((prev) => Math.min(prev + 1, POMODORO_SESSIONS_UNTIL_LONG_BREAK));
        setMode('break');

        const breakTime = sessionCount + 1 >= POMODORO_SESSIONS_UNTIL_LONG_BREAK
          ? POMODORO_LONG_BREAK
          : POMODORO_SHORT_BREAK
        setRemainingTime(breakTime);
      } else {
        setMode('work');
        setRemainingTime(POMODORO_WORK_TIME);

        if (sessionCount >= POMODORO_SESSIONS_UNTIL_LONG_BREAK) {
          setSessionCount(0);
      }
    }
      // setIsRunning(false);
		}
	}, [isRunning, remainingTime, mode, sessionCount]);

	const progress =
		((getInitialTime() - remainingTime) / getInitialTime()) * 100;

  function getInitialTime() {
    if (mode === 'work') return POMODORO_WORK_TIME;
    return sessionCount >= POMODORO_SESSIONS_UNTIL_LONG_BREAK
      ? POMODORO_LONG_BREAK
      : POMODORO_SHORT_BREAK;
  }

	return {
		sessionCount,
		isRunning,
		remainingTime,
		progress,
		toggleTimer,
		resetTimer,
    mode,

	};
}
