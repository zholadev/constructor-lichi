import React from "react";
import { cn } from "@/components/lib/utils";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import {
	ITemplateBaseSchema,
} from "@/components/features/app/blocks/types/interface-components";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {
	currentItemData: {
		id: string;
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

	const onClickHandle = () => {
		if (editorDisabledEdit) return;
		dialog.dialogAddComponent.toggle();
		editorSelectAddComponentAction({
			item: currentItemData,
			template,
		});
	};

	return (
		<div
			className={cn(
				"border w-full h-full min-h-80 bg-white flex items-center justify-center transition-all duration-100 cursor-pointer",
				!editorDisabledEdit ? "hover:bg-[#bbf7d0]" : ""
			)}
			onClick={onClickHandle}
		>
			{currentItemData?.data?.type}
		</div>
	);
};

export default BoardEmptyCard;
