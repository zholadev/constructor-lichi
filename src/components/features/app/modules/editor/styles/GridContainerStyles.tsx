import React, { CSSProperties, useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import usePermission from "@/components/shared/hooks/usePermission";

interface IStyles {
	gap: number;
}

interface Props {
	onUpdateSchemaHandle?: (values: CSSProperties) => void;
	styles?: any;
	hideTitle?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 24.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Refactoring, remove ts-ignore
 * @fixme
 * @param props
 * @constructor
 */
const GridContainerStyles: React.FC<Props> = (props) => {
	const { onUpdateSchemaHandle, styles, hideTitle } = props;

	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [stylesValue, setStylesValues] = useState<IStyles>({
		gap: 0,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод обновления стилей
	 * @param value
	 * @param key
	 */
	const onChangeHandle = (value: number, key: keyof IStyles) => {
		try {
			if (!value || !key) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			setStylesValues((prev) => {
				const updateValues = {
					...prev,
					[key]: value,
				};

				if (onUpdateSchemaHandle) {
					onUpdateSchemaHandle(updateValues);
				}

				return updateValues;
			});
		} catch (error) {
			errorHandler("layoutStyles", "onChangeJustifyHandle", error);
		}
	};

	useEffect(() => {
		if (!styles) return;
		setStylesValues(styles);
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Grid</h3>}

			{permission.styles.grid.gap && (
				<>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Grid Gap (Расстояние между)
					</Label>
					<div
						className={cn(
							"w-full flex flex-row mt-2 items-center gap-2"
						)}
					>
						<Input
							className={cn("focus-visible:ring-0")}
							value={stylesValue.gap}
							type="number"
							onChange={(e) =>
								onChangeHandle(
									parseFloat(e.target.value),
									"gap"
								)
							}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default GridContainerStyles;
