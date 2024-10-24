import React, { ReactNode } from "react";
import { cn } from "@/components/lib/utils";
import useSchemaElementData from "@/components/shared/hooks/useSchemaElementData";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useWidgetActions from "@/components/features/app/modules/widgets/hooks/useWidgetActions";
import useElementActions from "@/components/features/app/modules/elements/hooks/useElementActions";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";

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
	const elementActions = useElementActions();
	const widgetActions = useWidgetActions();
	const activeElementData = useActiveElementObserver();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления элемента к компоненту
	 */
	const onClickHandle = () => {
		if (!type) return;
		const element = getElementSchema(type);

		if (!element) {
			toastMessage("Не удалось найти схему!", "error");
			return;
		}

		if (activeElementData?.selectWidgetIsEditing) {
			widgetActions.widgetAddElement(element);
			return;
		}

		elementActions.elementCreate(element);
	};

	return (
		<div
			className={cn(
				"w-full h-[100px] rounded-md relative hover:bg-secondary transition-all duration-75 text-sm cursor-pointer border flex items-center justify-center flex-col"
			)}
			onClick={onClickHandle}
		>
			{children}
		</div>
	);
};

export default ElementContentWrapper;
