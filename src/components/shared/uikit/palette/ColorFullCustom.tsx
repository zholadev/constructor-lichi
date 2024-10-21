import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/components/lib/utils";
import useFirstRender from "@/components/shared/hooks/useFirstRender";

interface Props {
	outputColor?: string;
	onOutputColorChange?: (color: string) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ColorFullCustom: React.FC<Props> = (props) => {
	const { onOutputColorChange, outputColor } = props;
	const [color, setColor] = useState<string>("#aabbcc");

	const firstRender = useFirstRender();

	const debouncedState = useDebouncedCallback((newColor: string) => {
		if (firstRender) return;
		if (onOutputColorChange) onOutputColorChange(newColor);
	}, 500);

	const onChangeHandle = (newColor: string) => {
		setColor(newColor);
		debouncedState(newColor);
	};

	useEffect(() => {
		if (!outputColor) return;
		setColor(outputColor);
	}, [outputColor]);

	return (
		<div className={cn("w-full")}>
			<HexColorPicker color={color} onChange={onChangeHandle} />
		</div>
	);
};

export default ColorFullCustom;
