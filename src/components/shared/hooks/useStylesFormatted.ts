import { useAppSelector } from "@/components/app/store/hooks/hooks";

// Вспомогательная функция для проверки и добавления "px"
const addPxToStyle = (value: unknown) =>
	typeof value === "number" ? `${value}px` : value;

// Вспомогательная функция для обработки массивов значений (например, margin или padding)
const formatArrayWithPx = (values: unknown) =>
	Array.isArray(values)
		? values.map((value) => `${value}px`).join(" ")
		: values;

// Вспомогательная функция для обработки массивов значений (например, margin или padding)
const formatArrayWithFr = (values: unknown) =>
	Array.isArray(values)
		? values.map((value) => `${value}fr`).join(" ")
		: values;

/**
 * @author Zholaman Zhumanov
 * @created 30.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Refactoring
 * @fixme
 * @constructor
 */
export default function useStylesFormatted(): (
	componentStyles: Record<string, unknown>,
	skipDarkStyles?: boolean
) => Record<string, unknown> {
	const { spaceModeTheme } = useAppSelector((state) => state?.space);

	return (
		componentStyles: Record<string, unknown>,
		skipDarkStyles?: boolean
	) => {
		const updatedStyles: Record<string, unknown> = {};

		// eslint-disable-next-line no-restricted-syntax
		for (const key in componentStyles) {
			if (componentStyles.hasOwnProperty(key)) {
				const value = componentStyles[key];

				// Если активна темная тема и существует свойство, заканчивающееся на "Dark"
				if (
					spaceModeTheme === "dark" &&
					!skipDarkStyles &&
					key.endsWith("Dark")
				) {
					updatedStyles[key.slice(0, -4)] = value;
				} else if (!key.endsWith("Dark")) {
					switch (key) {
						case "fontSize":
						case "borderRadius":
						case "borderTopRightRadius":
						case "borderTopLeftRadius":
						case "borderBottomLeftRadius":
						case "borderBottomRightRadius":
						case "gap":
							updatedStyles[key] = addPxToStyle(value);
							break;
						case "margin":
						case "padding":
							updatedStyles[key] = formatArrayWithPx(value);
							break;
						case "gridTemplateColumns":
							updatedStyles[key] = formatArrayWithFr(value);
							break;
						default:
							updatedStyles[key] = value;
					}
				}
			}
		}

		return updatedStyles;
	};
}
