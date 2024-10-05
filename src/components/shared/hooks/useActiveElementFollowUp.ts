import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	ActiveElementType,
	AdditionalTypes,
	TotalComponentTypes,
} from "@/components/shared/types/types";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";

interface IActiveElementFollowUp {
	type: ActiveElementType;
	containerId: string;
	id: string;
	currentActiveId: string;
	data: TotalComponentTypes;
	style: Record<string, unknown>;
	componentData: TotalComponentTypes;
	additionalData?: TotalComponentTypes;
	additionalType?: AdditionalTypes;
	additionalCurrentId?: string;
	containerData: ISchemaContainer;
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
export default function useActiveElementFollowUp(): IActiveElementFollowUp {
	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	return useMemo(() => {
		try {
			if (!spaceTemplateData || !editorActiveElement) return null;

			const foundContainerData = spaceTemplateData.find(
				(container) => container.id === editorActiveElement.containerId
			);

			const foundComponentData = foundContainerData?.components?.find(
				(component) => component?.data?.id === editorActiveElement?.id
			);

			const foundElement = foundComponentData?.data.elements.find(
				(element) =>
					element?.id === editorActiveElement?.currentActiveId
			);

			const type = editorActiveElement.type ?? "none";

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
							: {};

			return {
				type,
				data,
				currentActiveId,
				style,
				id: foundComponentData?.data?.id ?? "",
				componentData: foundComponentData?.data ?? {},
				containerId: editorActiveElement?.containerId ?? "",
				additionalData:
					foundComponentData?.data?.content?.stories || {},
				additionalType: editorAdditionalActiveElement ?? "none",
				additionalCurrentId:
					editorActiveElement.additionalCurrentId ?? "",
				containerData: foundContainerData ?? {},
			};
		} catch (error) {
			errorHandler("useActiveElementFollowUp", "root", error);
			return null;
		}
	}, [editorActiveElement, spaceTemplateData, editorAdditionalActiveElement]);
}
