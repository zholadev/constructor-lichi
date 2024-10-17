import React, { useEffect, useMemo } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import usePermission from "@/components/shared/hooks/usePermission";
import {
	ISchemaContentMediaType,
	ISchemaContentPhotoTriple,
	ISchemaContentVideoParams,
} from "@/components/shared/types/interface-schema-content";
import { ISchemaSettingsView } from "@/components/shared/types/interface-schema-settings";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";

interface IViewContent {
	id: number;
	value: ISchemaContentMediaType;
	name: string;
}

const viewContentTypeData: IViewContent[] = [
	{
		id: 1,
		value: "image",
		name: "Картинка",
	},
	{
		id: 2,
		value: "video",
		name: "Видео",
	},
];

interface Props {
	settingValue?: ISchemaSettingsView;
	onUpdateSchemaHandle?: (value: ISchemaSettingsView) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Рефакторинг и Типизация
 * @fixme
 * @param props
 * @constructor
 */
const ViewSetting: React.FC<Props> = (props) => {
	const { settingValue, onUpdateSchemaHandle } = props;

	const activeElementData = useActiveElementObserver();
	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [viewSettingValue, setViewSettingValue] =
		React.useState<ISchemaSettingsView>({
			heightFull: false,
			navbarThemeMode: false,
			contentType: "image",
			darkTheme: false,
		});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param value
	 * @param key
	 */
	const viewSettingUpdateHandle = (
		value: boolean | ISchemaContentMediaType,
		key: keyof ISchemaSettingsView
	) => {
		if (value === undefined || value === null || !key) {
			toastMessage("ValueError: value is not defined", "error");
			return;
		}

		setViewSettingValue((prevState) => {
			const updateValues = {
				...prevState,
				[key]: value,
			};

			if (onUpdateSchemaHandle) onUpdateSchemaHandle(updateValues);

			return updateValues;
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем есть ли оба контента в схеме данных
	 */
	const isContentType: boolean = useMemo(() => {
		const isWidget: boolean =
			activeElementData?.selectWidgetIsEditing ?? false;

		const contentData = isWidget
			? // @ts-ignore
				activeElementData?.selectWidgetActiveData?.content
			: // @ts-ignore
				activeElementData?.selectActiveData?.content;

		if (!contentData) return false;

		const videoContent = contentData?.video as
			| ISchemaContentVideoParams
			| undefined;
		const imageContent = contentData?.photo as
			| ISchemaContentPhotoTriple
			| undefined;

		return !!(videoContent && imageContent);
	}, [activeElementData]);

	useEffect(() => {
		if (!settingValue) return;
		setViewSettingValue(settingValue);
	}, [settingValue]);

	return (
		<div className={cn("w-full px-1 mb-3")}>
			{permission.setting.view.contentType && isContentType && (
				<div className={cn("w-full flex flex-col mb-5")}>
					<h3 className={cn("text-xs mb-3 font-bold")}>
						Тип контента для показа
					</h3>
					<Select
						disabled={viewContentTypeData.length === 0}
						defaultValue={viewSettingValue.contentType}
						value={viewSettingValue.contentType}
						onValueChange={(value: ISchemaContentMediaType) =>
							viewSettingUpdateHandle(value, "contentType")
						}
					>
						<SelectTrigger className="w-full min-w-[120px]">
							<SelectValue placeholder="Выберите тип" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{viewContentTypeData.map((item) => {
									return (
										<SelectItem
											key={item.id}
											value={item.value}
										>
											{item.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			)}

			{permission.setting.view.heightFull && (
				<div
					className={cn(
						"flex justify-between cursor-pointer items-center flex-row gap-2 mb-3"
					)}
				>
					<Label htmlFor="view-height-setting">
						<h3 className={cn("text-xs uppercase text-gray-500")}>
							На всю высоту (100vh)
						</h3>
					</Label>

					<div className={cn("flex items-center gap-2")}>
						<Switch
							id="view-height-setting"
							checked={viewSettingValue.heightFull}
							onCheckedChange={(value) => {
								viewSettingUpdateHandle(value, "heightFull");
							}}
						/>
					</div>
				</div>
			)}

			{permission.setting.view.navbarThemeMode && (
				<div
					className={cn(
						"flex justify-between cursor-pointer items-center flex-row gap-2 mb-3"
					)}
				>
					<Label htmlFor="view-header-mode-setting">
						<h3 className={cn("text-xs uppercase text-gray-500")}>
							Светлая шапка (header)
						</h3>
					</Label>

					<div className={cn("flex items-center gap-2")}>
						<Switch
							id="view-header-mode-setting"
							checked={viewSettingValue.navbarThemeMode}
							onCheckedChange={(value) => {
								viewSettingUpdateHandle(
									value,
									"navbarThemeMode"
								);
							}}
						/>
					</div>
				</div>
			)}

			{permission.setting.view.darkTheme && (
				<div
					className={cn(
						"flex justify-between cursor-pointer items-center flex-row gap-2 mb-3"
					)}
				>
					<Label htmlFor="view-header-mode-setting">
						<h3 className={cn("text-xs uppercase text-gray-500")}>
							Темная тема (вкл/выкл для стилей)
						</h3>
					</Label>

					<div className={cn("flex items-center gap-2")}>
						<Switch
							id="view-header-mode-setting"
							checked={viewSettingValue.darkTheme}
							onCheckedChange={(value) => {
								viewSettingUpdateHandle(value, "darkTheme");
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewSetting;
