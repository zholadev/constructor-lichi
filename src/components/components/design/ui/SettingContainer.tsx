import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import ImageSetting from "@/components/components/design/ui/settings/ImageSetting";
import { ImageIcon } from "@radix-ui/react-icons";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 26.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SettingContainer: React.FC<Props> = (props) => {
	const {} = props;

	const [defaultExpanded, setExpanded] = React.useState<string[]>(["image"]);

	return (
		<div className={cn("w-full p-3")}>
			<Accordion
				type="multiple"
				className="w-full"
				value={defaultExpanded}
				onValueChange={setExpanded}
			>
				<AccordionItem value="image">
					<AccordionTrigger>
						<div className={cn("w-full flex flex-row items-center gap-2")}>
							<ImageIcon />
							Image
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ImageSetting hideTitle />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SettingContainer;
