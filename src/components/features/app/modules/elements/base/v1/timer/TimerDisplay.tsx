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
	darkThemeSetting: boolean;
	counterStyle: Record<string, unknown>;
	unitStyle: Record<string, unknown>;
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
	const {
		days,
		hours,
		minutes,
		seconds,
		style,
		darkThemeSetting,
		counterStyle,
		unitStyle,
	} = props;

	const styleFormatted = useStylesFormatted();

	return (
		<ul
			className={styles.timer}
			style={{ ...styleFormatted(style, darkThemeSetting) }}
		>
			<TimerItem
				value={days}
				type="Дней"
				dot
				counterStyle={counterStyle}
				unitStyle={unitStyle}
			/>
			<TimerItem
				value={hours}
				type="Часов"
				dot
				counterStyle={counterStyle}
				unitStyle={unitStyle}
			/>
			<TimerItem
				value={minutes}
				type="минут"
				dot
				counterStyle={counterStyle}
				unitStyle={unitStyle}
			/>
			<TimerItem
				value={seconds}
				type="секунд"
				counterStyle={counterStyle}
				unitStyle={unitStyle}
			/>
		</ul>
	);
};

export default TimerDisplay;
