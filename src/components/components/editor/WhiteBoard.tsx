"use client";

import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import BoardDisplay from "@/components/components/board/BoardDisplay";
import BoardToolbar from "@/components/components/board/BoardToolbar";
import BoardDraggingDisplay from "@/components/components/board/BoardDraggingDisplay";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import StoriesContainer from "@/components/features/app/modules/editor/content/stories/StoriesContainer";

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const WhiteBoard: React.FC = () => {
	const { spaceTemplateApiLoading, spaceTemplateData } = useAppSelector(
		(state) => state.space
	);

	const { editorDraggingTemplate } = useAppSelector((state) => state.editor);

	const styleFormatted = useStylesFormatted();

	if (spaceTemplateApiLoading) {
		return (
			<div
				className={cn(
					"p-3 size-full flex flex-col items-center justify-center w-full"
				)}
			>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton key={index} className="h-[290px] w-full mb-4" />
				))}
			</div>
		);
	}

	return (
		<div
			className={cn("bg-secondary p-2 h-screen relative")}
			style={{ width: "calc(100% - 700px)" }}
		>
			<BoardToolbar />
			<StoriesContainer />
			{/*{spaceTemplateData.length > 0 && <HeaderModeView />}*/}
			<div
				style={{
					...styleFormatted({
						backgroundColor: "#ffffff",
						backgroundColorDark: "#181a1b",
						height: "calc(100vh - 50px)",
					}),
				}}
				className={cn("overflow-y-auto p-1")}
			>
				{editorDraggingTemplate ? (
					<BoardDraggingDisplay />
				) : (
					<BoardDisplay />
				)}
			</div>
		</div>
	);
};

export default WhiteBoard;
