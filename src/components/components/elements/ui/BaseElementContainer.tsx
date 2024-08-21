import React from "react";
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
];

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
			{elementData.map((item) => {
				return (
					<li key={item.id}>
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
					</li>
				);
			})}
		</ul>
	);
};

export default BaseElementContainer;
