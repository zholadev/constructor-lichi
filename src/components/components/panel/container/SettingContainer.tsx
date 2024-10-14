"use client";

import React, { useMemo } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shared/shadcn/ui/accordion";
import { cn } from "@/components/lib/utils";
import { LayoutIcon, TimerIcon } from "@radix-ui/react-icons";
import usePermission from "@/components/shared/hooks/usePermission";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import ElementSetting from "@/components/features/app/modules/editor/setting/ElementSetting";
import ViewSetting from "@/components/features/app/modules/editor/setting/ViewSetting";
import ShowSetting from "@/components/features/app/modules/editor/setting/ShowSetting";
import SwiperSetting from "@/components/features/app/modules/editor/setting/SwiperSetting";
import CategoryListSetting from "@/components/features/app/modules/editor/setting/CategoryListSetting";
import TimerSetting from "@/components/features/app/modules/editor/setting/TimerSetting";
import ActionSetting from "@/components/features/app/modules/editor/setting/ActionSetting";
import useUpdateActions from "@/components/shared/hooks/actions/useUpdateActions";
import useUpdateWidgetActions from "@/components/shared/hooks/actions/useUpdateWidgetActions";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

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
	const dialog = useDialogAction();
	const permission = usePermission();
	const updateActions = useUpdateActions();
	const updateWidgetActions = useUpdateWidgetActions();
	const activeElementData = useActiveElementObserver();

	const [defaultExpanded, setExpanded] = React.useState<SettingTypes[]>([
		"action",
	]);

	const settingDefaultData = useMemo(() => {
		const widgetActive =
			activeElementData?.widgetType !== "none" &&
			dialog.dialogWidget.open;
		return {
			view: widgetActive
				? activeElementData?.widgetActiveData?.settings?.view
				: activeElementData?.activeData?.settings?.view || {},
			show: widgetActive
				? activeElementData?.widgetActiveData?.settings?.show
				: activeElementData?.activeData?.settings?.show || {},
			swiper: widgetActive
				? activeElementData?.widgetActiveData?.settings?.swiper
				: activeElementData?.activeData?.settings?.swiper || {},
			timer: widgetActive
				? activeElementData?.widgetActiveData?.settings?.timer
				: activeElementData?.activeData?.settings?.timer || {},
			element: widgetActive
				? activeElementData?.widgetActiveData?.settings?.element
				: activeElementData?.activeData?.settings?.element || {},
			categoryList: widgetActive
				? activeElementData?.widgetActiveData?.settings?.categoryList
				: activeElementData?.activeData?.settings?.categoryList || {},
		};
	}, [activeElementData, permission]);

	const updateContentHandle = (data: any, path: string) => {
		if (
			activeElementData?.widgetType !== "none" &&
			dialog.dialogWidget.open
		) {
			updateWidgetActions.update(data, path);
			return;
		}
		updateActions.update(data, path);
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
			{permission.setting.element && (
				<AccordionItem value="timer">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Элемент</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ElementSetting
							settingValue={settingDefaultData.element}
							onSettingChange={(data) =>
								updateContentHandle(data, "settings.element")
							}
						/>
					</AccordionContent>
				</AccordionItem>
			)}

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

			{permission.setting.swiper.root && (
				<AccordionItem value="swiper">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Слайдер</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<SwiperSetting
							settingValue={settingDefaultData.swiper}
							onSettingChange={(data) =>
								updateContentHandle(data, "settings.swiper")
							}
						/>
					</AccordionContent>
				</AccordionItem>
			)}

			{permission.setting.categoryList && (
				<AccordionItem value="categoryList">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<LayoutIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Категории</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<CategoryListSetting
							settingValue={settingDefaultData.categoryList}
							onSettingChange={(data) =>
								updateContentHandle(
									data,
									"settings.categoryList"
								)
							}
						/>
					</AccordionContent>
				</AccordionItem>
			)}

			{permission.setting.timer && (
				<AccordionItem value="timer">
					<AccordionTrigger>
						<div className={cn("flex items-center gap-1")}>
							<TimerIcon width={13} height={13} />
							<span style={{ fontSize: "13px" }}>Таймер</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<TimerSetting
							settingValue={settingDefaultData.timer}
							onSettingChange={(data) =>
								updateContentHandle(data, "settings.timer")
							}
							onSettingChangeStyle={(data, path) => {
								updateContentHandle(data, path);
							}}
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
		</Accordion>
	);
};

export default SettingContainer;
