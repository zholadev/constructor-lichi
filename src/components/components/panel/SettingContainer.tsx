import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import { cn } from "@/components/lib/utils";
import { LayoutIcon } from "@radix-ui/react-icons";
import SwiperSetting from "@/components/features/app/panel/setting/SwiperSetting";
import ActionSetting from "@/components/features/app/panel/setting/ActionSetting";
import ViewSetting from "@/components/features/app/panel/setting/ViewSetting";
import ShowSetting from "@/components/features/app/panel/setting/ShowSetting";

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SettingContainer: React.FC = () => {
	const [defaultExpanded, setExpanded] = React.useState<string[]>([""]);

	return (
		<Accordion
			type="multiple"
			className="w-full"
			value={defaultExpanded}
			onValueChange={setExpanded}
		>
			<AccordionItem value="view">
				<AccordionTrigger>
					<div className={cn("flex items-center gap-1")}>
						<LayoutIcon width={13} height={13} />
						<span style={{ fontSize: "13px" }}>Вид</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<ViewSetting />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="show">
				<AccordionTrigger>
					<div className={cn("flex items-center gap-1")}>
						<LayoutIcon width={13} height={13} />
						<span style={{ fontSize: "13px" }}>Показ</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<ShowSetting />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="aciton">
				<AccordionTrigger>
					<div className={cn("flex items-center gap-1")}>
						<LayoutIcon width={13} height={13} />
						<span style={{ fontSize: "13px" }}>Событие</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<ActionSetting />
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="swiper">
				<AccordionTrigger>
					<div className={cn("flex items-center gap-1")}>
						<LayoutIcon width={13} height={13} />
						<span style={{ fontSize: "13px" }}>Слайдер</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<SwiperSetting />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default SettingContainer;
