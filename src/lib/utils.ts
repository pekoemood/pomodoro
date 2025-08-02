import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTime (seconds: number) {
	const min = Math.floor(seconds / 60).toString().padStart(2, '0');
	const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
	return `${min}:${sec}`
}

