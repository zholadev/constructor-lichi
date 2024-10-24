import React from "react";
import { cn } from "@/components/lib/utils";
import { ImageIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IContainerType } from "@/components/shared/types/types";

interface IBlockData {
	id: number;
	name: string;
	type: IContainerType;
}

const blocks: IBlockData[] = [
	{
		id: 1,
		name: "Saint Laurent",
		type: "saint_laurent_container",
	},
	{
		id: 2,
		name: "Category List",
		type: "category_list_container",
	},
];

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated refactoring
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const ComponentContent: React.FC = () => {
	const { dialogAddTemplateAction, editorAddComponentTypeAction } =
		useDispatchAction();
	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const toggleDialogAddTemplateHandle = () =>
		dialogAddTemplateAction(!dialogAddTemplate);

	return (
		<div>
			<h3 className={cn("text-sm uppercase mb-4")}>Base</h3>
			<Button
				variant="outline"
				className={cn(
					"flex flex-col mb-10 w-[120px] h-[140px] hover:text-green-500 "
				)}
				onClick={() => {
					editorAddComponentTypeAction("container");
					toggleDialogAddTemplateHandle();
				}}
			>
				<ImageIcon
					width={40}
					height={40}
					className="mb-3 text-gray-500"
				/>
				<PlusIcon width={20} height={20} />
			</Button>

			<h3 className={cn("text-sm uppercase mb-4")}>Special</h3>

			<div
				className={cn(
					"grid grid-cols-2 gap-2 overflow-y-auto overflow-x-hidden"
				)}
			>
				{blocks.map((block, index) => {
					return (
						<Button
							key={index}
							variant="outline"
							className={cn(
								"flex flex-col mb-5 h-[140px] hover:text-green-500 "
							)}
							onClick={() => {
								editorAddComponentTypeAction(block.type);
								toggleDialogAddTemplateHandle();
							}}
						>
							<span className={cn("text-xs uppercase mb-3")}>
								{block.name}
							</span>

							<PlusIcon width={20} height={20} />
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default ComponentContent;
