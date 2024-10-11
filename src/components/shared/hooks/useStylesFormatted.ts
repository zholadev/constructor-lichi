import { useAppSelector } from "@/components/app/store/hooks/hooks";

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
		let updatedStyles: Record<string, unknown> = {};

		for (const key in componentStyles) {
			if (componentStyles.hasOwnProperty(key)) {
				// Если активна темная тема и существует свойство, заканчивающееся на "Dark"
				if (
					spaceModeTheme === "dark" &&
					!skipDarkStyles &&
					key.endsWith("Dark")
				) {
					// Заменяем стандартное свойство на темное, удаляя "Dark" из ключа
					updatedStyles[key.slice(0, -4)] = componentStyles[key];
				} else if (!key.endsWith("Dark")) {
					// Проверяем и преобразуем `fontSize` к строке с "px"
					if (
						key === "fontSize" &&
						typeof componentStyles[key] === "number"
					) {
						updatedStyles[key] = `${componentStyles[key]}px`;
					}
					// Проверяем и преобразуем `margin` к строке с "px"
					else if (
						key === "margin" &&
						Array.isArray(componentStyles[key])
					) {
						const marginArray = componentStyles[key] as number[];
						updatedStyles[key] = marginArray
							.map((value) => `${value}px`)
							.join(" ");
					}
					// Проверяем и преобразуем `padding` к строке с "px"
					else if (
						key === "padding" &&
						Array.isArray(componentStyles[key])
					) {
						const paddingArray = componentStyles[key] as number[];
						updatedStyles[key] = paddingArray
							.map((value) => `${value}px`)
							.join(" ");
					} else {
						// Если свойство не относится к темным, `fontSize`, `margin` или `padding`, просто добавляем его как есть
						updatedStyles[key] = componentStyles[key];
					}
				}
			}
		}

		return updatedStyles;
	};
}
