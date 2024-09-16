import React from "react";
import { MousePointerClick } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import ElementContentWrapper from "@/components/components/elements/ElementContentWrapper";
import { cn } from "@/components/lib/utils";

interface Props {}

interface ISpecialElementData {
	id: number;
	name: string;
	icon: React.JSX.Element;
}

const specialElementData: ISpecialElementData[] = [
	{
		id: 1,
		name: "Button Underline",
		icon: <MousePointerClick />,
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
const ElementSpecialContainer: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Special Elements</AccordionTrigger>
				<AccordionContent>
					<ul className={cn("list-none grid grid-cols-3 gap-1")}>
						{specialElementData.map((item) => {
							return (
								<li key={item.id}>
									<ElementContentWrapper>
										<div className={cn("absolute top-6")}>
											{item.icon}
										</div>

										<span
											className={cn(
												"absolute text-center text-gray-400 text-sm bottom-2"
											)}
										>
											{item.name}
										</span>
									</ElementContentWrapper>
								</li>
							);
						})}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default ElementSpecialContainer;
