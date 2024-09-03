import React, { useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import BoardSortableItem from "@/components/components/board/ui/BoardSortableItem";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-components";
import BaseComponentRender from "@/components/components/ui/base/BaseComponentRender";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const BoardDraggingDisplay: React.FC<Props> = (props) => {
	const {} = props;

	const { spaceTemplateDataAction } = useDispatchAction();
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const [items, setItems] = useState(spaceTemplateData || []);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setItems((items: ITemplateBaseSchema[]) => {
				const oldIndex = items.findIndex(
					(item) => item.id === active.id
				);
				const newIndex = items.findIndex(
					(item) => item.id === over?.id
				);
				spaceTemplateDataAction(arrayMove(items, oldIndex, newIndex));
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={spaceTemplateData}
				strategy={verticalListSortingStrategy}
			>
				{Object.values(spaceTemplateData).map(
					(template: ITemplateBaseSchema) => {
						return (
							<BoardSortableItem
								id={template.id}
								key={template.id}
								styles={template.style}
							>
								{template.components.map((item) => {
									return (
										<BaseComponentRender
											key={item.id}
											data={item?.data}
											template={template}
											type={item.data?.type}
											currentItemData={item}
										/>
									);
								})}
							</BoardSortableItem>
						);
					}
				)}
			</SortableContext>
		</DndContext>
	);
};

export default BoardDraggingDisplay;
