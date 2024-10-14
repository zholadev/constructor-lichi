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
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import BoardContainerDisplay from "@/components/components/board/BoardContainerDisplay";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description Компонент для перемещения контейнеров между собой
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
const BoardDraggingDisplay: React.FC = () => {
	const { spaceTemplateDataAction } = useDispatchAction();
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const [sortContainerData, setSortContainerData] = useState<
		ISchemaContainer[]
	>([]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	useEffect(() => {
		setSortContainerData(spaceTemplateData || []);
	}, [spaceTemplateData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод выполняет сортировку данных по перемещению
	 * @param event
	 */
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = sortContainerData.findIndex(
				(item: ISchemaContainer) => item.id === active.id
			);
			const newIndex = sortContainerData.findIndex(
				(item: ISchemaContainer) => item.id === over.id
			);

			if (oldIndex !== -1 && newIndex !== -1) {
				const updatedItems = arrayMove(
					sortContainerData,
					oldIndex,
					newIndex
				);
				setSortContainerData(updatedItems);
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
				items={sortContainerData.map((item) => item.id)}
				strategy={verticalListSortingStrategy}
			>
				{sortContainerData.map((container) => (
					<BoardSortableItem id={container.id} key={container.id}>
						<BoardContainerDisplay
							containerType={container.type}
							containerData={container}
							displayType={container.display}
						/>
					</BoardSortableItem>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default BoardDraggingDisplay;
