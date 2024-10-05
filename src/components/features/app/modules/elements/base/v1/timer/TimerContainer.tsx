import React, { useEffect, useState } from "react";
import useTimerCountdown from "@/components/shared/hooks/useTimerCountdown";
import TimerDisplay from "./TimerDisplay";
import {IElementTotal} from "@/components/features/app/modules/elements/types/v1/interface-elements";

interface Props {
	targetDate: string | Date;
	styles?: React.CSSProperties;
	fontSTime?: string;
	fontSType?: string;
	data: IElementTotal;
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
	const { targetDate, styles, fontSTime, fontSType, data } = props;

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
			fontSTime={fontSTime}
			fontSType={fontSType}
			darkThemeSetting={!data?.settings?.view?.darkTheme}
		/>
	);
};

export default TimerContainer;
