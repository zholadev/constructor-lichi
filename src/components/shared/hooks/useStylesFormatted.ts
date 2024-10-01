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
export default function useStylesFormatted(): () => Record<string, unknown> {
	const { spaceModeTheme } = useAppSelector((state) => state?.space);

	return (
		componentStyles: Record<string, unknown>,
		skipDarkStyles: boolean
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
					// Если свойство не относится к темным, просто добавляем его как есть
					updatedStyles[key] = componentStyles[key];
				}
			}
		}

		return updatedStyles;
	};
}
