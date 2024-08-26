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
import {Palette, Type} from "lucide-react";
import {
	BorderAllIcon,
	ColorWheelIcon,
	LayoutIcon,
	PaddingIcon,
	SizeIcon,
} from "@radix-ui/react-icons";

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
		"typography",
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
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={15} height={15} />
							<span>Position</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<LayoutStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="size">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<SizeIcon width={15} height={15} />
							<span>Size</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<SizeStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="spacing">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<PaddingIcon width={15} height={15} />
							<span>Spacing</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<SpacingStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="border">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-2")}>
							<BorderAllIcon width={15} height={15} />
							<span>Border</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<BorderStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="typography">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<Type width={20} height={20} />
							<span>Typography</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<TypographyStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="fill">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<Palette width={20} height={20} />
							<span>Fill</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<BackgroundStyles hideTitle />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default DesignContent;
