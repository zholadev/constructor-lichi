import React from "react";
import { cn } from "@/components/lib/utils";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import {
	IComponentBaseSchema,
	ITemplateBaseSchema,
} from "@/components/shared/types/interface-components";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {
	currentItemData: {
		id: string;
		data?: IComponentBaseSchema;
		is_selected?: boolean;
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
	const { currentItemData, template } = props;

	const dialog = useDialogAction();

	const { editorSelectAddComponentAction } = useDispatchAction();

	const { editorDisabledEdit } = useAppSelector((state) => state.editor);

	return (
		<div
			className={cn(
				"border w-full h-full bg-white transition-all duration-100 cursor-pointer",
				!editorDisabledEdit ? "hover:bg-[#bbf7d0]" : ""
			)}
			onClick={() => {
				if (editorDisabledEdit) return;
				dialog.dialogAddComponent.toggle();
				editorSelectAddComponentAction({
					item: currentItemData,
					template,
				});
			}}
		>
			{currentItemData?.data?.type}
		</div>
	);
};

export default BoardEmptyCard;
