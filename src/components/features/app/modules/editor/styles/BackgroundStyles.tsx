import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useDebounce from "@/components/shared/hooks/useDebounce";
import usePermission from "@/components/shared/hooks/usePermission";
import { Button } from "@/components/shared/shadcn/ui/button";
import useActiveDarkThemeSetting from "@/components/shared/hooks/useActiveDarkThemeSetting";

interface IStylesValues {
	backgroundColor: string;
	backgroundColorDark?: string;
}

interface Props {
	onUpdateSchemaHandle?: (values: IStylesValues) => void;
	styles?: IStylesValues | null;
	hideTitle?: boolean;
	onRemoveSchemaHandle: (
		type: string,
		pathKey: string,
		pathMultiKeys: string[]
	) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme debounce fix
 * @param props
 * @constructor
 */
const BackgroundStyles: React.FC<Props> = (props) => {
	const { onUpdateSchemaHandle, styles, hideTitle, onRemoveSchemaHandle } =
		props;

	const toastMessage = useToastMessage();
	const permission = usePermission();
	const activeDarkTheme = useActiveDarkThemeSetting();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		backgroundColor: "#000000",
		backgroundColorDark: "#181a1b",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для стилей
	 * @param value
	 * @param key
	 */
	const onChangeHandle = (value: string, key: keyof IStylesValues) => {
		try {
			if (!value) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			setStylesValues((size) => {
				const updateValues = {
					...size,
					[key]: value,
				};

				if (onUpdateSchemaHandle) {
					onUpdateSchemaHandle(updateValues);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeHandle", error);
			}
		}
	};

	const debouncedHandleInput = useDebounce(onChangeHandle, 1000);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления всех стилей которые относится к модулю Position
	 */
	const removeStylesHandle = () => {
		if (onRemoveSchemaHandle) {
			onRemoveSchemaHandle("removeKey", "", [
				"style.backgroundColor",
				"style.backgroundColorDark",
			]);
		}
	};

	useEffect(() => {
		if (!styles) return;
		let defaultStyle = {
			backgroundColor: styles?.backgroundColor || "#ffffff",
			backgroundColorDark: styles?.backgroundColorDark || "#181a1b",
		};

		setStylesValues(defaultStyle);
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Size</h3>}
			<div className={cn("w-full p-1")}>
				<div
					className={cn(
						"flex flex-row gap-2 items-center justify-end"
					)}
				>
					<div className={cn("flex flex-row items-center gap-2")}>
						<Button
							type="button"
							variant="ghost"
							className={cn("text-xs")}
							onClick={removeStylesHandle}
						>
							Очистить
						</Button>
					</div>
				</div>

				{permission.styles.fill.backgroundColor && (
					<div>
						<Label
							className={cn("uppercase")}
							style={{ fontSize: "10px" }}
						>
							Background Color
						</Label>
						<div
							className={cn(
								"grid mt-2 grid-cols-3 gap-3 p-1 border rounded-md"
							)}
						>
							<Input
								className={cn("border-0 p-0")}
								value={
									activeDarkTheme
										? stylesValues.backgroundColorDark
										: stylesValues.backgroundColor
								}
								type="color"
								onChange={(e) => {
									onChangeHandle(
										e.target.value,
										activeDarkTheme
											? "backgroundColorDark"
											: "backgroundColor"
									);
								}}
							/>

							<Input
								className={cn(
									"col-span-2 border-0 focus-visible:ring-0"
								)}
								value={
									activeDarkTheme
										? stylesValues.backgroundColorDark
										: stylesValues.backgroundColor
								}
								type="text"
								onChange={(e) => {
									debouncedHandleInput(
										e.target.value,
										activeDarkTheme
											? "backgroundColorDark"
											: "backgroundColor"
									);
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BackgroundStyles;
