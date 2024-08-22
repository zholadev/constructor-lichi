import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/lib/utils";
import { MousePointerClick, Timer, Type } from "lucide-react";
import ElementWrapper from "@/components/components/elements/ui/ElementWrapper";

interface Props {}

interface IBaseElementData {
	id: number;
	name: string;
	icon: React.JSX.Element;
}

const elementData: IBaseElementData[] = [
	{
		id: 1,
		name: "Button",
		icon: <MousePointerClick />,
	},
	{
		id: 2,
		name: "Text",
		icon: <Type />,
	},
	{
		id: 3,
		name: "Timer",
		icon: <Timer />,
	},
	{
		id: 1,
		name: "Button",
		icon: <MousePointerClick />,
	},
	{
		id: 2,
		name: "Text",
		icon: <Type />,
	},
	{
		id: 3,
		name: "Timer",
		icon: <Timer />,
	},
	{
		id: 1,
		name: "Button",
		icon: <MousePointerClick />,
	},
	{
		id: 2,
		name: "Text",
		icon: <Type />,
	},
	{
		id: 3,
		name: "Timer",
		icon: <Timer />,
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.125, // Задержка для каждой карточки
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
 * @param props
 * @constructor
 */
const BaseElementContainer: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<ul className={cn("list-none grid grid-cols-3 gap-1 mb-7")}>
			{elementData.map((item, index) => {
				return (
					<motion.li
						custom={index}
						initial="hidden"
						animate="visible"
						whileHover={{ scale: 1.05 }}
						variants={cardVariants}
						key={item.id}
					>
						<ElementWrapper>
							<div className={cn("absolute top-8")}>
								{item.icon}
							</div>

							<span
								className={cn(
									"absolute text-center text-gray-400 text-sm bottom-2"
								)}
							>
								{item.name}
							</span>
						</ElementWrapper>
					</motion.li>
				);
			})}
		</ul>
	);
};

export default BaseElementContainer;
