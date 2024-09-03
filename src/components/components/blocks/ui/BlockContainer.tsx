import React from "react";
import { cn } from "@/components/lib/utils";
import { ImageIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {}

type BlockType = "block" | "swiper" | "video" | "stories";

interface IBlockData {
	id: number;
	name: string;
	type: BlockType;
}

const blocks: IBlockData[] = [
	{
		id: 1,
		name: "Saint Laurent",
		type: "block",
	},
	{
		id: 2,
		name: "Category List",
		type: "block",
	},
];

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const BlockContainer: React.FC<Props> = (props) => {
	const {} = props;

	const { dialogAddTemplateAction } = useDispatchAction();
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
				onClick={toggleDialogAddTemplateHandle}
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
							onClick={toggleDialogAddTemplateHandle}
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

export default BlockContainer;
