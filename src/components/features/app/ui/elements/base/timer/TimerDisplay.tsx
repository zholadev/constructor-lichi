import React from "react";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import styles from "./element-timer-1.0.0.module.sass";
import TimerItem from "./TimerItem";

interface Props {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
	style?: React.CSSProperties;
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
const TimerDisplay: React.FC<Props> = (props) => {
	const { days, hours, minutes, seconds, style, fontSTime, fontSType } =
		props;

	const styleFormatted = useStylesFormatted();

	return (
		<ul className={styles.timer} style={{ ...styleFormatted(style) }}>
			<TimerItem
				fontSTime={fontSTime}
				fontSType={fontSType}
				value={days}
				type="Дней"
				dot
			/>
			<TimerItem
				fontSTime={fontSTime}
				fontSType={fontSType}
				value={hours}
				type="Часов"
				dot
			/>
			<TimerItem
				fontSTime={fontSTime}
				fontSType={fontSType}
				value={minutes}
				type="минут"
				dot
			/>
			<TimerItem
				fontSTime={fontSTime}
				fontSType={fontSType}
				value={seconds}
				type="секунд"
			/>
		</ul>
	);
};

export default TimerDisplay;
