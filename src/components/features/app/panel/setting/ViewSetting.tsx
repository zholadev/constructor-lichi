import React, { useEffect } from "react";
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

type ContentType = "video" | "image";

interface IViewSetting {
	heightFull: boolean;
	navbarMode: boolean;
	contentType: ContentType;
}

interface IViewContent {
	id: number;
	value: ContentType;
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
	settingValue?: IViewSetting;
	onSettingChange?: (value: IViewSetting) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ViewSetting: React.FC<Props> = (props) => {
	const { settingValue, onSettingChange } = props;

	const toastMessage = useToastMessage();

	const [viewSettingValue, setViewSettingValue] =
		React.useState<IViewSetting>({
			heightFull: false,
			navbarMode: false,
			contentType: "image",
		});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param value
	 * @param key
	 */
	const viewSettingUpdateHandle = (
		value: boolean | ContentType,
		key: keyof IViewSetting
	) => {
		if (value === undefined || value === null) {
			toastMessage("ValueError: value is not defined", "error");
			return;
		}

		if (!key) {
			toastMessage("ValueError: key is not defined", "error");
			return;
		}

		setViewSettingValue((prevState) => {
			const updateValues = {
				...prevState,
				[key]: value,
			};

			if (onSettingChange) onSettingChange(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		if (settingValue) {
			setViewSettingValue({
				...settingValue,
			});
		}
	}, []);

	return (
		<div className={cn("w-full px-1 mb-3")}>
			<div className={cn("w-full flex flex-col mb-5")}>
				<h3 className={cn("text-xs mb-3 font-bold")}>
					Тип контента для показа
				</h3>
				<Select
					disabled={viewContentTypeData.length === 0}
					defaultValue={viewSettingValue.contentType}
					value={viewSettingValue.contentType}
					onValueChange={(value: ContentType) =>
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
						checked={viewSettingValue.navbarMode}
						onCheckedChange={(value) => {
							viewSettingUpdateHandle(value, "navbarMode");
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewSetting;
