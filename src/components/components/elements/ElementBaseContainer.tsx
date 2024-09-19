import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/lib/utils";
import { MousePointerClick, Timer, Type } from "lucide-react";
import ElementContentWrapper from "@/components/components/elements/ElementContentWrapper";
import { versionElementBase } from "@/components/app/versions/version-modules";
import { IElementBaseListData } from "./types/types";

const elementData: IElementBaseListData[] = [
	{
		id: 1,
		type: "button",
		name: "Button",
		version: versionElementBase.button.version,
		icon: <MousePointerClick />,
		style: {},
	},
	{
		id: 2,
		type: "text",
		name: "Text",
		version: versionElementBase.text.version,
		icon: <Type />,
		style: {},
	},
	{
		id: 3,
		type: "timer",
		name: "Timer",
		version: versionElementBase.timer.version,
		icon: <Timer />,
		style: {},
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.125,
			duration: 0.5,
		},
	}),
};

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const ElementBaseContainer: React.FC = () => {
	return (
		<ul className={cn("list-none grid grid-cols-3 gap-1 mb-7")}>
			{elementData.map((item, index) => {
				return (
					<motion.li
						custom={index}
						initial="hidden"
						animate="visible"
						variants={cardVariants}
						key={item.id}
					>
						<ElementContentWrapper type={item.type}>
							<div className={cn("absolute top-8")}>
								{item.icon}
							</div>

							<span
								className={cn(
									"absolute text-center text-gray-400 text-xs bottom-2"
								)}
							>
								{item.name}
							</span>
						</ElementContentWrapper>
					</motion.li>
				);
			})}
		</ul>
	);
};

export default ElementBaseContainer;
