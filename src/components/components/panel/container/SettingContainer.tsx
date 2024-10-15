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
import useUpdateWidgetActions from "@/components/features/app/modules/widgets/hooks/useUpdateWidgetActions";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";

export type SettingTypes = "view" | "show" | "action" | "swiper";

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Типизация и рефакторинг
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

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем данные с компонентов и элементов
	 */
	const settingDefaultData: ISchemaSettings = useMemo(() => {
		const widgetActive =
			activeElementData?.widgetType !== "none" &&
			dialog.dialogWidget.open;

		const widgetSettingData = activeElementData?.widgetActiveData
			.settings as ISchemaSettings;
		const settingData = activeElementData?.activeData
			.settings as ISchemaSettings;

		return {
			view: widgetActive ? widgetSettingData?.view : settingData?.view,
			show: widgetActive ? widgetSettingData?.show : settingData?.show,
			swiper: widgetActive
				? widgetSettingData?.swiper
				: settingData?.swiper,
			timer: widgetActive ? widgetSettingData?.timer : settingData?.timer,
			element: widgetActive
				? widgetSettingData?.element
				: settingData?.element,
			categoryList: widgetActive
				? widgetSettingData?.categoryList
				: settingData?.categoryList,
		};
	}, [activeElementData, permission]);

	const updateSchemaHandle = (data: any, path: string) => {
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
							defaultData={settingDefaultData.element}
							onUpdateSchemaHandle={(data) =>
								updateSchemaHandle(data, "settings.element")
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
								updateSchemaHandle(data, "settings.view")
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
								updateSchemaHandle(data, "settings.show")
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
								updateSchemaHandle(data, "settings.swiper")
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
								updateSchemaHandle(
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
								updateSchemaHandle(data, "settings.timer")
							}
							onSettingChangeStyle={(data, path) => {
								updateSchemaHandle(data, path);
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
