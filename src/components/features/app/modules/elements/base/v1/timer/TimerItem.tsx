import React from "react";
import styles from "./element-timer-1.0.0.module.sass";

interface Props {
	value: string;
	type?: string;
	dot?: boolean;
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
const TimerItem: React.FC<Props> = (props) => {
	const { value, type, dot, counterStyle, unitStyle } = props;
	return (
		<li className={styles.timer_display}>
			<div
				className={styles.timer_display_value}
				style={{ ...counterStyle }}
			>
				{value}{" "}
				{dot && <span className={styles.timer_display_dot}>.</span>}
			</div>
			{type && (
				<span
					className={styles.timer_display_type}
					style={{ ...unitStyle }}
				>
					{type}
				</span>
			)}
		</li>
	);
};

export default TimerItem;
