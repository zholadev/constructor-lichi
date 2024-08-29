import React from "react";
import { cn } from "@/components/lib/utils";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-components";

interface Props {
	item: {
		id: string;
	};
	template: ITemplateBaseSchema;
}

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const BoardEmptyCard: React.FC<Props> = (props) => {
	const { item, template } = props;

	const { editorSelectAddComponentAction } = useDispatchAction();

	const dialog = useDialogAction();

	return (
		<div
			className={cn(
				"border w-full h-full hover:bg-[#bbf7d0] transition-all duration-100 cursor-pointer"
			)}
			onClick={() => {
				dialog.dialogAddComponent.toggle();
				editorSelectAddComponentAction({ item, template });
			}}
		/>
	);
};

export default BoardEmptyCard;
