import React, { useEffect, useState } from "react";
import useTimerCountdown from "@/components/shared/hooks/useTimerCountdown";
import {
	IElementTotal,
	ITimerElement,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";
import TimerDisplay from "./TimerDisplay";

interface Props {
	targetDate: string | Date;
	styles?: React.CSSProperties;
	data: IElementTotal & ITimerElement;
}

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Removed // @ts-ignore
 * @fixme
 * @param props
 * @constructor
 */
const TimerContainer: React.FC<Props> = (props) => {
	const { targetDate, styles, data } = props;

	const [targetDateState, setTargetDateState] = useState<string | Date>();

	// @ts-ignore
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
			darkThemeSetting={!data?.settings?.view?.darkTheme}
			counterStyle={data?.settings?.timer?.counter?.style}
			unitStyle={data?.settings?.timer?.unit?.style}
		/>
	);
};

export default TimerContainer;
