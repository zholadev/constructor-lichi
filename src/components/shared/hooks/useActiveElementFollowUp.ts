import { CSSProperties, useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	ActiveElementType,
	TotalComponentTypes,
} from "@/components/shared/types/types";

interface IActiveElementFollowUp {
	type: ActiveElementType;
	containerId: string;
	id: string;
	currentActiveId: string;
	data: TotalComponentTypes;
	style: CSSProperties;
	componentData: TotalComponentTypes;
}

/**
 * @author Zholaman Zhumanov
 * @created 23.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
export default function useActiveElementFollowUp(): IActiveElementFollowUp | null {
	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return useMemo(() => {
		try {
			if (!spaceTemplateData || !editorActiveElement) return null;

			const foundContainerData = spaceTemplateData.find(
				(container) => container.id === editorActiveElement.containerId
			);

			const foundComponentData = foundContainerData?.components.find(
				(component) => component.data.id === editorActiveElement.id
			);

			const foundElement = foundComponentData?.data.elements.find(
				(element) => element.id === editorActiveElement.currentActiveId
			);

			const type = editorActiveElement.type ?? "";

			const data =
				type === "component"
					? (foundComponentData?.data ?? {})
					: type === "element"
						? (foundElement ?? {})
						: type === "container"
							? (foundContainerData ?? {})
							: null;

			const currentActiveId =
				type === "component"
					? foundComponentData?.data?.id
					: type === "element"
						? foundElement?.id
						: type === "container"
							? foundContainerData?.id
							: "";

			const style =
				type === "component"
					? foundComponentData?.data?.style
					: type === "element"
						? foundElement?.style
						: type === "container"
							? foundContainerData?.style
							: null;

			return {
				type,
				data,
				currentActiveId,
				style,
				id: foundComponentData?.data?.id ?? "",
				componentData: foundComponentData?.data ?? {},
				containerId: editorActiveElement?.containerId ?? "",
			};
		} catch (error) {
			errorHandler("useActiveElementFollowUp", "root", error);
			return null; // Ensure a null return if there's an error
		}
	}, [editorActiveElement, spaceTemplateData]);
}
