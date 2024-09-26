import { useEffect, useState } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

interface CountdownTime {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
}

interface Props {
	endTime: boolean;
	expireDate: string | boolean;
	countdownTime: CountdownTime;
}

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 * @param targetDate
 */
export default function useTimerCountdown(targetDate: string | Date): Props {
	const [expireDate, setExpireDate] = useState<string | boolean>("");
	const [endTime, setEndTime] = useState(false);
	const [countdownTime, setCountdownTime] = useState<CountdownTime>({
		days: "00",
		hours: "00",
		minutes: "00",
		seconds: "00",
	});

	useEffect(() => {
		setExpireDate(`${targetDate}`);
	}, [targetDate]);

	useEffect(() => {
		const timeInterval = setInterval(() => {
			try {
				const countdownDateTime = new Date(
					expireDate as string
				).getTime();
				const currentTime = new Date().getTime();
				const remainingDayTime = countdownDateTime - currentTime;

				if (remainingDayTime <= 0) {
					clearInterval(timeInterval);
					setExpireDate(false);
					setEndTime(false);
					setCountdownTime({
						days: "00",
						hours: "00",
						minutes: "00",
						seconds: "00",
					});
				} else {
					const totalDays = Math.floor(
						remainingDayTime / (1000 * 60 * 60 * 24)
					);
					const totalHours = Math.floor(
						(remainingDayTime % (1000 * 60 * 60 * 24)) /
							(1000 * 60 * 60)
					);
					const totalMinutes = Math.floor(
						(remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
					);
					const totalSeconds = Math.floor(
						(remainingDayTime % (1000 * 60)) / 1000
					);

					setCountdownTime({
						days: totalDays.toString().padStart(2, "0"),
						hours: totalHours.toString().padStart(2, "0"),
						minutes: totalMinutes.toString().padStart(2, "0"),
						seconds: totalSeconds.toString().padStart(2, "0"),
					});
					setEndTime(true);
				}
			} catch (error) {
				errorHandler("useTimerCountdown", "useEffect", error);
			}
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	}, [expireDate]);

	return { countdownTime, endTime, expireDate };
}
