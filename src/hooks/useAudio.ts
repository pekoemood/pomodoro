import { useCallback, useRef } from "react";

export function useAudio() {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const playSound = useCallback((src: string) => {
		try {
			// 既存のaudio要素があれば停止
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}

			// 新しいaudio要素を作成
			audioRef.current = new Audio(src);
			audioRef.current.volume = 0.5; // デフォルト音量50%

			// 再生
			const playPromise = audioRef.current.play();

			// Promiseベースの再生エラーハンドリング
			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.warn("Audio playback failed:", error);
				});
			}
		} catch (error) {
			console.error("Error playing audio:", error);
		}
	}, []);

	const stopSound = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	}, []);

	const setVolume = useCallback((volume: number) => {
		if (audioRef.current) {
			audioRef.current.volume = Math.max(0, Math.min(1, volume));
		}
	}, []);

	return {
		playSound,
		stopSound,
		setVolume,
	};
}
