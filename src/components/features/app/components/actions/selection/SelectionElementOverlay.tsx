import React from "react";
import { cn } from "@/components/lib/utils";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {
	id: string;
}
/**
 * @author Zholaman Zhumanov
 * @created 19.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SelectionElementOverlay: React.FC<Props> = (props) => {
	const { id } = props;

	const { editorNavigatorHoverId } = useAppSelector((state) => state.editor);

	return (
		<div
			className={cn(
				"bg-cyan-500 size-full absolute top-0 left-0",
				editorNavigatorHoverId === id
					? "visible opacity-50 pointer-events-auto"
					: "hidden opacity-0 pointer-events-none"
			)}
			style={{
				zIndex: editorNavigatorHoverId === id ? 100 : 0,
			}}
		/>
	);
};

export default SelectionElementOverlay;
