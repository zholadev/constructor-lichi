import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useDebounce from "@/components/shared/hooks/useDebounce";
import usePermission from "@/components/shared/hooks/usePermission";

interface IStylesValues {
	backgroundColor: string;
}

type StylesKeys = "backgroundColor";

interface Props {
	onStyleChange?: (values: IStylesValues) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
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
	const { onStyleChange, styles, hideTitle } = props;

	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		backgroundColor: "#000000",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для стилей
	 * @param value
	 * @param type
	 */
	const onChangeStyleHandle = (value: string, type: StylesKeys) => {
		try {
			if (!value) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			setStylesValues((size) => {
				const updateValues = {
					...size,
					[type]: value,
				};

				if (onStyleChange) {
					onStyleChange(updateValues);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeStyleHandle", error);
			}
		}
	};

	const debouncedHandleInput = useDebounce(onChangeStyleHandle, 1000);

	useEffect(() => {
		if (styles) {
			setStylesValues({
				backgroundColor: styles.backgroundColor || "#000000",
			});
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Size</h3>}
			<div className={cn("w-full p-1")}>
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
								value={stylesValues.backgroundColor}
								type="color"
								onInput={(e) => {
									onChangeStyleHandle(
										e.target.value,
										"backgroundColor"
									);
								}}
							/>

							<Input
								className={cn(
									"col-span-2 border-0 focus-visible:ring-0"
								)}
								value={stylesValues.backgroundColor}
								type="text"
								onChange={(e) => {
									debouncedHandleInput(
										e.target.value,
										"backgroundColor"
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
