import React, { useEffect } from "react";
import { cn } from "@/components/lib/utils";
import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";

interface Props {
	outputColor?: string;
	onOutputColorChange?: (color: string) => void;
}

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
	const hexValue = hex.slice(1);
	const r = parseInt(hexValue.substring(0, 2), 16);
	const g = parseInt(hexValue.substring(2, 4), 16);
	const b = parseInt(hexValue.substring(4, 6), 16);
	return { r, g, b };
};

const sanitizeHex = (hex: string): string => {
	const cleanedHex = hex.replace(/[^A-Fa-f0-9]/g, "");

	if (cleanedHex.length === 3 || cleanedHex.length === 6) {
		return `#${cleanedHex}`;
	}

	return `#${cleanedHex.substring(0, 6)}`;
};

// Helper function to create an IColor object
const createColorFromHex = (hex: string): IColor => {
	const rgb = { ...hexToRgb(hex), a: 1 };
	const hexColor = sanitizeHex(hex);
	return {
		hex: hexColor,
		rgb,
		// @ts-ignore
		hsv: { h: 0, s: 0, v: 0 },
		alpha: 1,
	};
};

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
const ColorPaletteCustom: React.FC<Props> = (props) => {
	const { outputColor, onOutputColorChange } = props;

	const [color, setColor] = useColor("#000000");

	const onChangeComplete = (newColor: IColor) => {
		const colorFormatted = {
			hex: sanitizeHex(newColor.hex),
			rgb: newColor.rgb,
			hsv: newColor.hsv,
		};
		setColor(colorFormatted);
		if (onOutputColorChange) onOutputColorChange(sanitizeHex(newColor.hex));
	};

	const onChange = (newColor: IColor) => {
		setColor(newColor);
	};

	useEffect(() => {
		if (!outputColor) return;
		const newColor = createColorFromHex(outputColor);
		setColor(newColor);
	}, [outputColor]);

	return (
		<div className={cn("w-full")}>
			<ColorPicker
				color={color}
				hideAlpha
				hideInput={["hsv", "rgb"]}
				onChangeComplete={onChangeComplete}
				onChange={onChange}
			/>
		</div>
	);
};

export default ColorPaletteCustom;
