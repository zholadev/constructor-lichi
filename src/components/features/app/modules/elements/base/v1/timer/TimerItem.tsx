import React from "react";
import styles from "./element-timer-1.0.0.module.sass";

interface Props {
	value: string;
	type?: string;
	dot?: boolean;
	fontSType?: string;
	fontSTime?: string;
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
const TimerItem: React.FC<Props> = (props) => {
	const { value, type, dot, fontSType, fontSTime } = props;

	return (
		<li className={styles.timer_display}>
			<div
				className={styles.timer_display_value}
				style={{ fontSize: fontSTime }}
			>
				{value}{" "}
				{dot && <span className={styles.timer_display_dot}>.</span>}
			</div>
			{type && (
				<span
					className={styles.timer_display_type}
					style={{ fontSize: fontSType }}
				>
					{type}
				</span>
			)}
		</li>
	);
};

export default TimerItem;
