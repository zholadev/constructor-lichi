"use client";

import React, { useEffect, useState } from "react";
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
import BoardSortableItem from "@/components/components/board/BoardSortableItem";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { ITemplateBaseSchema } from "@/components/features/app/blocks/types/interface-components";
import BaseComponentRender from "@/components/features/app/blocks/container/BaseComponentRender";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
const BoardDraggingDisplay: React.FC = () => {
	const { spaceTemplateDataAction } = useDispatchAction();
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const [items, setItems] = useState<ITemplateBaseSchema[]>([]);

	useEffect(() => {
		setItems(spaceTemplateData || []);
	}, [spaceTemplateData]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);

			if (oldIndex !== -1 && newIndex !== -1) {
				const updatedItems = arrayMove(items, oldIndex, newIndex);
				setItems(updatedItems);
				spaceTemplateDataAction(updatedItems);
			}
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={items.map((item) => item.id)}
				strategy={verticalListSortingStrategy}
			>
				{items.map((template) => (
					<BoardSortableItem
						id={template.id}
						key={template.id}
						styles={template.style}
					>
						{template.components.map((item) => (
							<BaseComponentRender
								key={item.id}
								data={item?.data}
								template={template}
								type={item.data?.type}
								currentItemData={item}
							/>
						))}
					</BoardSortableItem>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default BoardDraggingDisplay;
