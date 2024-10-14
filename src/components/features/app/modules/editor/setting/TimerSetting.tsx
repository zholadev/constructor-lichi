import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ISchemaSettingsTimer } from "@/components/shared/types/interface-schema-settings";
import { cn } from "@/components/lib/utils";
import { Popover, PopoverTrigger } from "@/components/shared/shadcn/ui/popover";
import { Button } from "@/components/shared/shadcn/ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/shared/shadcn/ui/calendar";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { getFormattedDateSixDaysAhead } from "@/components/shared/utils/utils";
import { TimePicker } from "@/components/shared/shadcn/ui/timer-picker";
import Divider from "@/components/shared/uikit/divider/Divider";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import TypographyStyles from "@/components/features/app/modules/editor/styles/TypographyStyles";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { defaultSettings } from "@/components/entities/defSettings/def_settings";

interface Props {
	settingValue?: ISchemaSettingsTimer;
	onSettingChange?: (value: ISchemaSettingsTimer) => void;
	onSettingChangeStyle?: (value: ISchemaSettingsTimer, path: string) => void;
}

type TimeStyleUnit = "counter" | "unit";

interface ITimeStyleUnit {
	id: number;
	name: string;
	value: TimeStyleUnit;
}

const timeStyleUnitData: ITimeStyleUnit[] = [
	{
		id: 1,
		name: "Числа",
		value: "counter",
	},
	{
		id: 2,
		name: "Тексты",
		value: "unit",
	},
];

const convertDateForSend = (data: ISchemaSettingsTimer): any => {
	const { targetDate, targetTime } = data;

	return {
		targetDate: getFormattedDateSixDaysAhead(targetDate, false),
		targetTime,
	};
};

const filterStyleForUnits = (data: ISchemaSettingsTimer): any => {
	const { counter, unit } = data;

	return {
		counter,
		unit,
	};
};

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const TimerSetting: React.FC<Props> = (props) => {
	const { settingValue, onSettingChange, onSettingChangeStyle } = props;

	const toastMessage = useToastMessage();

	const [timeStyleUnitType, setTimeStyleUnitType] =
		useState<TimeStyleUnit>("counter");

	const [timerSettingValue, setSettingValue] =
		React.useState<ISchemaSettingsTimer>({
			targetDate: "",
			targetTime: Date(),
			counter: {
				style: {},
			},
			unit: {
				style: {},
			},
		});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onSettingUpdateHandle = (
		key: keyof ISchemaSettingsTimer,
		value: string | Date
	) => {
		if (!key || !value) {
			toastMessage(
				`ValueError: ${!key ? "key" : "value"} is not defined`,
				"error"
			);
			return;
		}

		setSettingValue((prevState) => {
			const updateValues = {
				...prevState,
				[key]: value,
			};

			if (onSettingChange) {
				const convertData = convertDateForSend(updateValues);
				onSettingChange(convertData);
			}

			return updateValues;
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления стили для units таймера
	 * @param value
	 */
	const onChangeStyleHandle = (
		key: TimeStyleUnit,
		value: Record<any, unknown>
	) => {
		setSettingValue((prevState) => {
			const updateValues = {
				...prevState,
				[key]: {
					style: {
						...prevState?.[key]?.style,
						...value,
					},
				},
			};

			if (onSettingChangeStyle) {
				const filterData = filterStyleForUnits(updateValues);

				onSettingChangeStyle(
					filterData?.[timeStyleUnitType],
					`settings.timer.${timeStyleUnitType}`
				);
			}

			return updateValues;
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения активного стиля units
	 */
	const currentUnitStyle: Record<string, unknown> = useMemo(() => {
		if (timeStyleUnitType === "counter") {
			return timerSettingValue?.counter?.style ?? {};
		}
		if (timeStyleUnitType === "unit") {
			return timerSettingValue?.unit?.style ?? {};
		}
		return {};
	}, [timeStyleUnitType, timerSettingValue, defaultSettings]);

	const convertTimerToFullDate: any = useCallback(() => {
		try {
			if (typeof timerSettingValue.targetTime !== "string")
				return new Date();

			const timerString = timerSettingValue.targetTime;

			const [hours, minutes, seconds] = timerString
				.split(":")
				.map(Number);

			// Создаем новую дату (например, сегодня) и устанавливаем время
			const currentDate = new Date();
			return setSeconds(
				setMinutes(setHours(currentDate, hours), minutes),
				seconds
			);
		} catch (error) {
			errorHandler("timerSetting", "convertTimerToFullData", error);
		}
	}, [timerSettingValue]);

	useEffect(() => {
		if (settingValue) {
			setSettingValue(settingValue);
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full px-1")}>
			<div className={cn("flex flex-col")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Дата
				</h3>

				<div className={cn("bg-white mb-5")}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full justify-start text-left font-normal",
									!timerSettingValue.targetDate &&
										"text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{timerSettingValue.targetDate ? (
									format(timerSettingValue.targetDate, "PPP")
								) : (
									<span>Выберите дату</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-full p-0 bg-white"
							align="center"
						>
							<Calendar
								mode="single"
								selected={timerSettingValue.targetDate}
								onSelect={(value) =>
									onSettingUpdateHandle("targetDate", value)
								}
								initialFocus
							/>

							<Divider spacing="small" />

							<div className={cn("px-3 mt-3")}>
								<TimePicker
									date={convertTimerToFullDate()}
									setDate={(value) =>
										onSettingUpdateHandle(
											"targetTime",
											format(value, "HH:mm:ss")
										)
									}
								/>
							</div>
						</PopoverContent>
					</Popover>
				</div>

				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Стили
				</h3>

				<div className={cn("w-full mb-5")}>
					<Select
						defaultValue={timeStyleUnitType}
						value={timeStyleUnitType}
						onValueChange={(value: TimeStyleUnit) =>
							setTimeStyleUnitType(value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите тип" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{timeStyleUnitData.map((time, index) => {
									return (
										<SelectItem
											key={index}
											value={time.value}
										>
											{time.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<TypographyStyles
					hideTitle
					styles={currentUnitStyle}
					onStyleChange={(data) => {
						onChangeStyleHandle(timeStyleUnitType, data);
					}}
					hideRemove
					// onRemoveStylesChange={removeStylesHandle}
				/>
			</div>
		</div>
	);
};

export default TimerSetting;
