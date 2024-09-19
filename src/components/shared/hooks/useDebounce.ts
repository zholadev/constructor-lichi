import { useCallback, useRef } from "react";

/**
 * @author Zholaman Zhumanov
 * @created 17.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 * @param callback
 * @param delay
 */
export default function useDebounce<T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number = 500
): (...args: T) => void {
	const timer = useRef<NodeJS.Timeout | null>(null);

	return useCallback(
		(...args: T) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);
}
