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
import usePermission from "@/components/shared/hooks/usePermission";

export type SettingTypes = "view" | "show" | "action" | "swiper";

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
	const permission = usePermission();

	const [defaultExpanded, setExpanded] = React.useState<SettingTypes[]>([
		"action",
	]);

	return (
		<Accordion
			type="multiple"
			className="w-full"
			value={defaultExpanded}
			onValueChange={(value: SettingTypes[]) => setExpanded(value)}
		>
			{permission.setting.view && (
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
			)}

			{permission.setting.view && (
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
			)}

			{permission.setting.action && (
				<AccordionItem value="action">
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
			)}

			{permission.setting.swiper && (
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
			)}
		</Accordion>
	);
};

export default SettingContainer;
