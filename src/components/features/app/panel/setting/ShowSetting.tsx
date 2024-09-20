import React, { useEffect } from "react";
import { cn } from "@/components/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

type ShowSiteType = "base" | "retail" | "all";

interface IShowSiteType {
	id: number;
	value: ShowSiteType;
	name: string;
}

const showSiteTypeData: IShowSiteType[] = [
	{
		id: 1,
		value: "all",
		name: "Все",
	},
	{
		id: 2,
		value: "base",
		name: "Обычный пользователь",
	},
	{
		id: 3,
		value: "retail",
		name: "Партнерский пользователь",
	},
];

interface IShowSetting {
	siteType: ShowSiteType;
}

interface Props {
	settingValue?: IShowSetting;
	onSettingChange?: (value: IShowSetting) => void;
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
const ShowSetting: React.FC<Props> = (props) => {
	const { settingValue, onSettingChange } = props;

	const toastMessage = useToastMessage();

	const [showSettingValue, setShowSettingValue] =
		React.useState<IShowSetting>({
			siteType: "all",
		});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param value
	 * @param key
	 */
	const onShowSettingUpdateHandle = (
		value: ShowSiteType,
		key: keyof IShowSetting
	) => {
		if (!value) {
			toastMessage("ValueError: value is not defined", "error");
			return;
		}

		if (!key) {
			toastMessage("ValueError: key is not defined", "error");
			return;
		}

		setShowSettingValue((prevState) => {
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
			setShowSettingValue({
				...settingValue,
			});
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full px-1 mb-3")}>
			<div className={cn("w-full flex flex-col")}>
				<h3 className={cn("text-xs mb-3 font-bold")}>Тип сайта</h3>
				<Select
					disabled={showSiteTypeData.length === 0}
					defaultValue={showSettingValue.siteType}
					value={showSettingValue.siteType}
					onValueChange={(value: ShowSiteType) =>
						onShowSettingUpdateHandle(value, "siteType")
					}
				>
					<SelectTrigger className="w-full min-w-[120px]">
						<SelectValue placeholder="Выберите тип" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{showSiteTypeData.map((item) => {
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
		</div>
	);
};

export default ShowSetting;
