import React, { ReactNode } from "react";
import { cn } from "@/components/lib/utils";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";
import useElementData from "@/components/shared/hooks/useElementData";
import { ElementBaseTypes } from "@/components/shared/types/types-components";

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

	const editorEvent = useEditorEvent();
	const getElementSchema = useElementData();

	return (
		<div
			className={cn(
				"w-full h-[100px] rounded-md relative hover:bg-secondary transition-all duration-75 text-sm cursor-pointer border flex items-center justify-center flex-col"
			)}
			onClick={() => {
				if (!type) return;
				const element = getElementSchema(type);
				editorEvent.addElement(element);
			}}
		>
			{children}
		</div>
	);
};

export default ElementContentWrapper;
