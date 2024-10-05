import React, { ReactNode } from "react";
import { cn } from "@/components/lib/utils";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";
import useSchemaElementData from "@/components/shared/hooks/useSchemaElementData";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useWidgetActions from "@/components/shared/hooks/useWidgetActions";

interface Props {
	children: ReactNode;
	type?: ElementBaseTypes;
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
const ElementContentWrapper: React.FC<Props> = (props) => {
	const { children, type } = props;

	const toastMessage = useToastMessage();

	const getElementSchema = useSchemaElementData();
	const editorEvent = useEditorEvent();
	const widgetActions = useWidgetActions();

	const { editorAdditionalActiveElement } = useAppSelector(
		(state) => state.editor
	);

	return (
		<div
			className={cn(
				"w-full h-[100px] rounded-md relative hover:bg-secondary transition-all duration-75 text-sm cursor-pointer border flex items-center justify-center flex-col"
			)}
			onClick={() => {
				if (!type) return;
				const element = getElementSchema(type);

				if (!element) {
					toastMessage("Не удалось найти схему!", "error");
					return;
				}

				if (editorAdditionalActiveElement === "stories") {
					widgetActions.widgetAddElement(element);
					return;
				}

				editorEvent.addElement(element);
			}}
		>
			{children}
		</div>
	);
};

export default ElementContentWrapper;
