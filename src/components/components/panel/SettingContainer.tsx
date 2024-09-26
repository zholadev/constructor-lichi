import React, { useMemo } from "react";
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
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";
import TimerSetting from "@/components/features/app/panel/setting/TimerSetting";

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
	const editorEvent = useEditorEvent();
	const activeElementData = useActiveElementFollowUp();

	const [defaultExpanded, setExpanded] = React.useState<SettingTypes[]>([
		"action",
	]);

	const settingDefaultData = useMemo(() => {
		return {
			view: activeElementData?.data?.settings?.view || {},
			show: activeElementData?.data?.settings?.show || {},
			swiper: activeElementData?.data?.settings?.swiper || {},
			timer: activeElementData?.data?.setting?.timer || {},
		};
	}, [activeElementData]);

	const updateContentHandle = (data, path) => {
		editorEvent.updateComponent(data, "settings", path);
	};

	if (!permission.panel.setting) {
		return (
			<h2 className={cn("w-full text-center text-xs")}>Нет доступа!</h2>
		);
	}

	return (
		<Accordion
			type="multiple"
			className="w-full"
			value={defaultExpanded}
			onValueChange={(value: SettingTypes[]) => setExpanded(value)}
		>
			{permission.setting.view.root && (
				<AccordionItem value="view">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Вид</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ViewSetting
							settingValue={settingDefaultData.view}
							onSettingChange={(data) =>
								updateContentHandle(data, "settings.view")
							}
						/>
					</AccordionContent>
				</AccordionItem>
			)}

			{permission.setting.show.root && (
				<AccordionItem value="show">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Показ</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ShowSetting
							settingValue={settingDefaultData.show}
							onSettingChange={(data) =>
								updateContentHandle(data, "settings.show")
							}
						/>
					</AccordionContent>
				</AccordionItem>
			)}

			{permission.setting.action.root && (
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

			{permission.setting.swiper.root && (
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

			{permission.setting.timer && (
				<AccordionItem value="timer">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Таймер</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<TimerSetting
							settingValue={settingDefaultData.timer}
							onSettingChange={(data) =>
								updateContentHandle(data, "settings.timer")
							}
						/>
					</AccordionContent>
				</AccordionItem>
			)}
		</Accordion>
	);
};

export default SettingContainer;
