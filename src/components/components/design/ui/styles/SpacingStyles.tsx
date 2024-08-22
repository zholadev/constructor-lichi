import React, { useState } from "react";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import {
	PinBottomIcon,
	PinLeftIcon,
	PinRightIcon,
	PinTopIcon,
} from "@radix-ui/react-icons";

interface Props {
	onSizeChange?: (newSize: number) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

type JustifyContent =
	| "flex-start"
	| "flex-end"
	| "center"
	| "space-between"
	| "space-around"
	| "space-evenly";

type AlignItems = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

interface IStylesValues {
	justifyContent: JustifyContent;
	alignItems: AlignItems;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SpacingStyles: React.FC<Props> = (props) => {
	const { onSizeChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		justifyContent: "flex-start",
		alignItems: "flex-start",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param value
	 * @param type
	 */
	const onChangeStylesHandle = (
		value: JustifyContent,
		type: JustifyContent
	) => {
		try {
			if (!value) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			if (!type) {
				toastMessage("TypeError: type is not defined", "error");
				return;
			}

			setStylesValues((size) => {
				return {
					...size,
					[type]: value,
				};
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("layoutStyles", "onChangeJustifyHandle", error);
			}
		}
	};

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Spacing</h3>}

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Margin (Outside)
			</Label>
			<div className={cn("w-full grid grid-cols-2 mt-2 gap-2 mb-6")}>
				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinTopIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>

				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinBottomIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>

				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinLeftIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>

				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinRightIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>
			</div>

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Padding (Inside)
			</Label>
			<div className={cn("w-full grid grid-cols-2 mt-2 gap-2")}>
				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinTopIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>

				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinBottomIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>

				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinLeftIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>

				<div
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<PinRightIcon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default SpacingStyles;
