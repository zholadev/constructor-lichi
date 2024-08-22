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
import LayoutStyles from "@/components/components/design/ui/styles/LayoutStyles";
import SpacingStyles from "@/components/components/design/ui/styles/SpacingStyles";

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
		"position",
		"size",
		"border",
		"fill",
		"spacing",
	]);

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				<AccordionItem value="position">
					<AccordionTrigger>Position</AccordionTrigger>
					<AccordionContent>
						<LayoutStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="size">
					<AccordionTrigger>Size</AccordionTrigger>
					<AccordionContent>
						<SizeStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="spacing">
					<AccordionTrigger>Spacing</AccordionTrigger>
					<AccordionContent>
						<SpacingStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="border">
					<AccordionTrigger>Border</AccordionTrigger>
					<AccordionContent>
						<BorderStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="typography">
					<AccordionTrigger>Typography</AccordionTrigger>
					<AccordionContent>
						<TypographyStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="fill">
					<AccordionTrigger>Fill</AccordionTrigger>
					<AccordionContent>
						<BackgroundStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default DesignContent;
