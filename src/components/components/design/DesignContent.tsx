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
import LayoutStyles from "@/components/features/app/panel/styles/LayoutStyles";
import SizeStyles from "@/components/features/app/panel/styles/SizeStyles";
import SpacingStyles from "@/components/features/app/panel/styles/SpacingStyles";
import BorderStyles from "@/components/features/app/panel/styles/BorderStyles";
import TypographyStyles from "@/components/features/app/panel/styles/TypographyStyles";
import BackgroundStyles from "@/components/features/app/panel/styles/BackgroundStyles";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import { IComponentBaseSchema } from "@/components/features/app/blocks/types/interface-components";

type AccessTypes =
	| "position"
	| "size"
	| "spacing"
	| "border"
	| "typography"
	| "fill";
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
const DesignContent: React.FC = () => {
	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	// console.log("editorActiveElement", editorActiveElement);
	const toastMessage = useToastMessage();
	const editorEvent = useEditorEvent();

	const [defaultExpanded, setExpanded] = React.useState<string[]>([""]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения стиля активного компонента
	 */
	const styleActiveData = useMemo(() => {
		// Получаем контейнер
		const findContainer = spaceTemplateData.find(
			(container: ITemplateBaseSchema) =>
				container.id === editorActiveElement?.containerId
		);

		if (findContainer) {
			if (editorActiveElement?.type === "component") {
				const component = findContainer?.components?.find(
					(component: IComponentBaseSchema) =>
						component?.data?.id === editorActiveElement?.id
				);

				return component?.data?.style ?? {};
			}
			if (editorActiveElement?.type === "element") {
				const findComponent = findContainer?.components?.find(
					(component: IComponentBaseSchema) =>
						component?.data?.id === editorActiveElement?.id
				);

				const findElement = findComponent?.data?.elements?.find(
					(element: IComponentBaseSchema) =>
						element?.id === editorActiveElement?.currentActiveId
				);

				return findElement?.style ?? {};
			}
		} else {
			return editorActiveElement?.style ?? {};
		}
	}, [editorActiveElement, spaceTemplateData]);

	const activeUpdateTypeData = useMemo(() => {
		return editorActiveElement.type ?? "";
	}, [editorActiveElement, spaceTemplateData]);

	const filterContentKeys = (
		content: Content,
		accessTypes: AccessTypes[]
	) => {
		const filteredKeys: ContentKeys[] = Object.keys(content)
			.filter((key) => accessTypes.includes(key as AccessTypes))
			.map((key) => key as ContentKeys);

		setExpanded(filteredKeys);
	};

	const onUpdateHandle = (value, path = "style", type?: string) => {
		if (!value) {
			toastMessage(
				"Данные не прилетают для обновление! Проверьте onStyleChange",
				"error"
			);
			return;
		}

		if (!activeUpdateTypeData) {
			toastMessage(
				"Тип не найден! Проверьте activeUpdateTypeData",
				"error"
			);
			return;
		}

		console.log("border values: ", value, path, type);
		if (type === "removeKey") {
			editorEvent.updateComponent(
				value,
				activeUpdateTypeData,
				path,
				false,
				true
			);
		} else {
			editorEvent.updateComponent(value, activeUpdateTypeData, path);
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

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				<AccordionItem value="position">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Position</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<LayoutStyles
							hideTitle
							styles={styleActiveData}
							onStyleChange={onUpdateHandle}
						/>
					</AccordionContent>
				</AccordionItem>
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
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="spacing">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<PaddingIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Spacing</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<SpacingStyles
							hideTitle
							styles={styleActiveData}
							onStyleChange={onUpdateHandle}
						/>
					</AccordionContent>
				</AccordionItem>
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
								onUpdateHandle(...params)
							}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="typography">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<Type width={17} height={17} />
							<span style={{ fontSize: "13px" }}>Typography</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<TypographyStyles
							hideTitle
							styles={styleActiveData}
							onStyleChange={onUpdateHandle}
						/>
					</AccordionContent>
				</AccordionItem>
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
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default DesignContent;
