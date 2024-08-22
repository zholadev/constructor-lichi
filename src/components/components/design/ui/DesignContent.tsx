import React from "react";
import { cn } from "@/components/lib/utils";
import SizeStyles from "@/components/components/design/ui/styles/SizeStyles";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import BorderStyles from "@/components/components/design/ui/styles/BorderStyles";
import BackgroundStyles from "@/components/components/design/ui/styles/BackgroundStyles";
import TypographyStyles from "@/components/components/design/ui/styles/TypographyStyles";

interface Props {}

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
const DesignContent: React.FC<Props> = (props) => {
	const {} = props;

	const [defaultExpanded, setExpanded] = React.useState<string[]>([
		"item1",
		"item2",
		"item3",
		"item4",
		"item5",
	]);

	return (
		<div className={cn("w-full p-3 overflow-y-auto")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				<AccordionItem value="item1">
					<AccordionTrigger>Size</AccordionTrigger>
					<AccordionContent>
						<SizeStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item2">
					<AccordionTrigger>Border</AccordionTrigger>
					<AccordionContent>
						<BorderStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item3">
					<AccordionTrigger>Fill</AccordionTrigger>
					<AccordionContent>
						<BackgroundStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item4">
					<AccordionTrigger>Typography</AccordionTrigger>
					<AccordionContent>
						<TypographyStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default DesignContent;
