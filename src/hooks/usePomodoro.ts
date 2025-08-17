import { useEffect, useState } from "react";
import {
	POMODORO_LONG_BREAK,
	POMODORO_SESSIONS_UNTIL_LONG_BREAK,
	POMODORO_SHORT_BREAK,
	POMODORO_WORK_TIME,
} from "@/lib/constants";
import type { TimeMode } from "@/lib/types";
import { useAudio } from "./useAudio";

export function usePomodoro() {
	const [isRunning, setIsRunning] = useState(false);
	const [remainingTime, setRemainingTime] =
		useState<number>(POMODORO_WORK_TIME);
	const [sessionCount, setSessionCount] = useState<number>(0);
	const [mode, setMode] = useState<TimeMode>("work");
	const [selectedSound, setSelectedSound] =
		useState<string>("/sounds/rain.mp3");
	const { playSound } = useAudio();

	const toggleTimer = () => setIsRunning((prev) => !prev);

	const resetTimer = () => {
		setRemainingTime(POMODORO_WORK_TIME);
		setIsRunning(false);
		setMode("work");
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
			// 状況に応じた音楽選択
			let soundToPlay = selectedSound;

			if (mode === "work") {
				// 作業終了時 - 穏やかな音
				soundToPlay = "/sounds/work-complete.mp3";

				// 4セッション完了時は特別な音
				if (sessionCount + 1 >= POMODORO_SESSIONS_UNTIL_LONG_BREAK) {
					soundToPlay = "/sounds/long-break.mp3";
				}
			} else {
				// 休憩終了時 - 元気な音
				soundToPlay = "/sounds/break-complete.mp3";
			}

			playSound(soundToPlay);

			if (mode === "work") {
				setSessionCount((prev) =>
					Math.min(prev + 1, POMODORO_SESSIONS_UNTIL_LONG_BREAK),
				);
				setMode("break");

				const breakTime =
					sessionCount + 1 >= POMODORO_SESSIONS_UNTIL_LONG_BREAK
						? POMODORO_LONG_BREAK
						: POMODORO_SHORT_BREAK;
				setRemainingTime(breakTime);
			} else {
				setMode("work");
				setRemainingTime(POMODORO_WORK_TIME);

				if (sessionCount >= POMODORO_SESSIONS_UNTIL_LONG_BREAK) {
					setSessionCount(0);
				}
			}
			// setIsRunning(false);
		}
	}, [isRunning, remainingTime, mode, sessionCount, playSound, selectedSound]);

	const progress =
		((getInitialTime() - remainingTime) / getInitialTime()) * 100;

	function getInitialTime() {
		if (mode === "work") return POMODORO_WORK_TIME;
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
		selectedSound,
		setSelectedSound,
	};
}
