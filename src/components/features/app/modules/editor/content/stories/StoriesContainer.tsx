import React from "react";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { cn } from "@/components/lib/utils";
import StoriesContent from "./StoriesContent";

/**
 * @author Zholaman Zhumanov
 * @created 04.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const StoriesContainer: React.FC = () => {
	const dialog = useDialogAction();

	return (
		<div
			className={cn(
				`${dialog.dialogStoriesContainer.open ? "opacity-100 visible translate-y-full pointer-events-auto" : "opacity-0 hidden pointer-events-none translate-y-0"} relative top-[260px] w-full z-30 duration-75 transition-all`
			)}
		>
			<StoriesContent />
		</div>
	);
};

export default StoriesContainer;
