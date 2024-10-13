import React, { useEffect, useMemo } from "react";
import { cn } from "@/components/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import { Palette, Type } from "lucide-react";
import {
	BorderAllIcon,
	LayoutIcon,
	PaddingIcon,
	SizeIcon,
} from "@radix-ui/react-icons";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { Button } from "@/components/shared/shadcn/ui/button";
import usePermission from "@/components/shared/hooks/usePermission";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import GridContainerStyles from "@/components/features/app/modules/editor/styles/GridContainerStyles";
import PositionStyles from "@/components/features/app/modules/editor/styles/PositionStyles";
import SpacingStyles from "@/components/features/app/modules/editor/styles/SpacingStyles";
import BorderStyles from "@/components/features/app/modules/editor/styles/BorderStyles";
import TypographyStyles from "@/components/features/app/modules/editor/styles/TypographyStyles";
import BackgroundStyles from "@/components/features/app/modules/editor/styles/BackgroundStyles";
import SizeStyles from "@/components/features/app/modules/editor/styles/SizeStyles";
import useUpdateActions from "@/components/shared/hooks/actions/useUpdateActions";
import useUpdateWidgetActions from "@/components/shared/hooks/actions/useUpdateWidgetActions";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

type AccessTypes =
	| "position"
	| "size"
	| "spacing"
	| "border"
	| "typography"
	| "fill"
	| "grid";
type ContentKeys = AccessTypes;

interface Content {
	style?: Record<string, unknown>;
}

const accessTypes: AccessTypes[] = [
	"position",
	"size",
	"spacing",
	"border",
	"typography",
	"fill",
	"grid",
];

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, ts types
 * @fixme
 * @constructor
 */
const StylesContainer: React.FC = () => {
	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const dialog = useDialogAction();
	const permission = usePermission();
	const toastMessage = useToastMessage();
	const updateActions = useUpdateActions();
	const activeElementData = useActiveElementObserver();
	const updateWidgetActions = useUpdateWidgetActions();

	const [defaultExpanded, setExpanded] = React.useState<string[]>([""]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения стиля активного компонента
	 */
	const styleActiveData: Record<string, unknown> = useMemo(() => {
		return activeElementData?.activeStyle ?? {};
	}, [editorActiveElement, spaceTemplateData, activeElementData]);

	const activeUpdateTypeData = useMemo(() => {
		return editorActiveElement.type ?? "";
	}, [editorActiveElement, spaceTemplateData, activeElementData]);

	const filterContentKeys = (
		content: Content,
		accessTypes: AccessTypes[]
	) => {
		const filteredKeys: ContentKeys[] = Object.keys(content)
			.filter((key) => accessTypes.includes(key as AccessTypes))
			.map((key) => key as ContentKeys);

		setExpanded(filteredKeys);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления стили
	 * @param value
	 * @param path
	 * @param save
	 */
	const onUpdateHandle = (
		value: unknown,
		path: string = "style",
		save: boolean = true
	) => {
		if (!activeUpdateTypeData) {
			toastMessage(
				"Тип не найден! Проверьте activeUpdateTypeData",
				"error"
			);
			return;
		}

		if (
			activeElementData?.widgetType !== "none" &&
			dialog.dialogWidget.open
		) {
			updateWidgetActions.update(value, path, false, false, save);
			return;
		}

		updateActions.update(value, path, false, false, save);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления стили
	 * @param type
	 * @param valueKeys
	 */
	const removeStylesHandle = (
		type?: string,
		valueKeys: string | string[]
	) => {
		if (type === "removeKey") {
			if (
				activeElementData?.widgetType !== "none" &&
				dialog.dialogWidget.open
			) {
				updateWidgetActions.update({}, valueKeys, false, true);
				return;
			}
			updateActions.update({}, valueKeys, false, true);
		} else if (type === "removeObj") {
			if (
				activeElementData?.widgetType !== "none" &&
				dialog.dialogWidget.open
			) {
				updateWidgetActions.update({}, valueKeys, true, false);
				return;
			}
			updateActions.update({}, valueKeys, true, false);
		}
	};

	useEffect(() => {
		if (editorActiveElement.componentData) {
			if (editorActiveElement.componentData.content) {
				filterContentKeys(
					editorActiveElement.componentData.content,
					accessTypes
				);
			}
		}
	}, [editorActiveElement]);

	if (!permission.panel.styles) {
		return (
			<h2 className={cn("w-full text-center text-xs")}>Нет доступа!</h2>
		);
	}

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				{permission.styles.grid.root && (
					<AccordionItem value="grid">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<LayoutIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>Grid</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<GridContainerStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={onUpdateHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.styles.position.root && (
					<AccordionItem value="position">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<LayoutIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>
									Position
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<PositionStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={onUpdateHandle}
								onRemoveStylesChange={removeStylesHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.styles.size.root && (
					<AccordionItem value="size">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<SizeIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>Size</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<SizeStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={onUpdateHandle}
								onRemoveStylesChange={removeStylesHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.styles.spacing.root && (
					<AccordionItem value="spacing">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<PaddingIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>
									Spacing
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<SpacingStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={onUpdateHandle}
								onRemoveStylesChange={removeStylesHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.styles.border.border && (
					<AccordionItem value="border">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-2")}>
								<BorderAllIcon width={13} height={13} />
								<span style={{ fontSize: "13px" }}>Border</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<BorderStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={(...params) =>
									onUpdateHandle(...params, "style", false)
								}
								onRemoveStylesChange={removeStylesHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.styles.typography.root && (
					<AccordionItem value="typography">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<Type width={17} height={17} />
								<span style={{ fontSize: "13px" }}>
									Typography
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<TypographyStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={onUpdateHandle}
								onRemoveStylesChange={removeStylesHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}

				{permission.styles.fill.root && (
					<AccordionItem value="fill">
						<AccordionTrigger>
							<div className={cn("flex items-center gap-1")}>
								<Palette width={17} height={17} />
								<span style={{ fontSize: "13px" }}>Fill</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<BackgroundStyles
								hideTitle
								styles={styleActiveData}
								onStyleChange={onUpdateHandle}
								onRemoveStylesChange={removeStylesHandle}
							/>
						</AccordionContent>
					</AccordionItem>
				)}
			</Accordion>

			{permission.panel.styles && (
				<div className={cn("w-full mt-10")}>
					<Button
						variant="outline"
						className={cn("w-full")}
						onClick={() => removeStylesHandle("removeObj", "style")}
					>
						Очистить все стили
					</Button>
				</div>
			)}
		</div>
	);
};

export default StylesContainer;
