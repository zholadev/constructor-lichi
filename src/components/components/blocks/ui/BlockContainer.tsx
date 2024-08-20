import React from "react";
import { cn } from "@/components/lib/utils";

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
		name: "Album Block",
		type: "block",
	},
	{
		id: 2,
		name: "Dynamic Block",
		type: "block",
	},
	{
		id: 3,
		name: "Video Block",
		type: "video",
	},
	{
		id: 3,
		name: "Single Swiper Block",
		type: "swiper",
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

	return (
		<div className={cn("grid grid-cols-2 overflow-y-auto overflow-x-hidden")}>
			{blocks.map((block, i) => {
				return (
					<div
						key={i}
						className={cn(
							"border-b cursor-pointer min-h-[120px] p-1",
							i % 2 === 0 ? "border-r" : ""
						)}
					>
						{block.name}
					</div>
				);
			})}
		</div>
	);
};

export default BlockContainer;
