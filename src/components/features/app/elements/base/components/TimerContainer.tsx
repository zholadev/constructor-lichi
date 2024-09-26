import React, { useEffect, useState } from "react";
import useTimerCountdown from "@/components/shared/hooks/useTimerCountdown";
import TimerDisplay from "./TimerDisplay";

interface Props {
	targetDate: string | Date;
	styles?: React.CSSProperties;
	fontSTime?: string;
	fontSType?: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const TimerContainer: React.FC<Props> = (props) => {
	const { targetDate, styles, fontSTime, fontSType } = props;

	const [targetDateState, setTargetDateState] = useState<string | Date>();

	const { countdownTime } = useTimerCountdown(targetDateState);

	useEffect(() => {
		setTargetDateState(targetDate);
	}, [targetDate]);

	return (
		<TimerDisplay
			days={countdownTime.days}
			hours={countdownTime.hours}
			minutes={countdownTime.minutes}
			seconds={countdownTime.seconds}
			style={styles}
			fontSTime={fontSTime}
			fontSType={fontSType}
		/>
	);
};

export default TimerContainer;
