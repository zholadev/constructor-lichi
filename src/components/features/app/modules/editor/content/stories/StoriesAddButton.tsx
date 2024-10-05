import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { ImageIcon, PlusIcon } from "@radix-ui/react-icons";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

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
const StoriesAddButton: React.FC = () => {
	const dialog = useDialogAction();

	const toggleDialogAddTemplateHandle = () => {
		dialog.dialogAddComponent.toggle();
	};

	return (
		<div className={cn("bg-white p-3 h-[40vh]")}>
			<Button
				variant="outline"
				className={cn(
					"flex flex-col w-[140px] h-[170px] hover:text-green-500 "
				)}
				onClick={toggleDialogAddTemplateHandle}
			>
				<ImageIcon
					width={80}
					height={80}
					className="mb-5 text-gray-500"
				/>
				<PlusIcon width={20} height={20} />
			</Button>
		</div>
	);
};

export default StoriesAddButton;
