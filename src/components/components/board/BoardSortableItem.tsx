import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/components/lib/utils";

interface Props {
	id: number | string;
	children: React.ReactNode;
	styles: React.CSSProperties;
}

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description Компонент для
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const BoardSortableItem: React.FC<Props> = (props) => {
	const { id, children, styles } = props;

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={{
				...style,
				...styles,
			}}
			{...attributes}
			{...listeners}
			className={cn("border w-full min-h-80 relative")}
		>
			<div
				className={cn(
					"size-full hover:bg-[#e0f2fe] transition-all duration-75 opacity-70 top-0 left-0 absolute"
				)}
			/>
			{children}
		</div>
	);
};

export default BoardSortableItem;
