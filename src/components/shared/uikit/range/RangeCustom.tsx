import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
	outputRange?: number[];
	onOutputRangeChange?: (value: number[]) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 20.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const RangeCustom: React.FC<Props> = (props) => {
	const { outputRange = [0], onOutputRangeChange } = props;
	const [range, setRange] = useState<number | number[]>(outputRange);

	const onChangeComplete = () => {
		// @ts-ignore
		if (onOutputRangeChange) onOutputRangeChange(range);
	};

	const onChange = (value: number | number[]) => {
		setRange(value);
	};

	useEffect(() => {
		if (!outputRange) return;
		setRange(outputRange);
	}, [outputRange]);

	return (
		<Slider
			min={0}
			max={30}
			value={range}
			defaultValue={range}
			onChange={onChange}
			onChangeComplete={onChangeComplete}
		/>
	);
};

export default RangeCustom;
