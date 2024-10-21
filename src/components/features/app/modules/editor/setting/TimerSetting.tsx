import React, {
	CSSProperties,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
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

interface Props {
	settingValue?: ISchemaSettingsTimer;
	onUpdateSchemaHandle?: (value: ISchemaSettingsTimer) => void;
	onUpdateSchemaStyleHandle?: (
		value: ISchemaSettingsTimer,
		path: string
	) => void;
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
	const { settingValue, onUpdateSchemaHandle, onUpdateSchemaStyleHandle } =
		props;

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
	const onChangeHandle = (
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

			if (onUpdateSchemaHandle) {
				const convertData = convertDateForSend(updateValues);
				onUpdateSchemaHandle(convertData);
			}

			return updateValues;
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления стили для units таймера
	 * @param key
	 * @param value
	 */
	const onChangeStyleHandle = useCallback(
		(key: TimeStyleUnit, value: CSSProperties) => {
			setSettingValue((prevState) => {
				const updatedValues = {
					...prevState,
					[key]: {
						style: { ...prevState[key].style, ...value },
					},
				};

				if (onUpdateSchemaStyleHandle) {
					const filteredData = filterStyleForUnits(updatedValues);
					onUpdateSchemaStyleHandle(
						filteredData[timeStyleUnitType],
						`settings.timer.${timeStyleUnitType}`
					);
				}

				return updatedValues;
			});
		},
		[onUpdateSchemaStyleHandle, timeStyleUnitType]
	);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения активного стиля units
	 */
	const currentUnitStyle = useMemo(() => {
		return timeStyleUnitType === "counter"
			? timerSettingValue.counter.style
			: timerSettingValue.unit.style;
	}, [timeStyleUnitType, timerSettingValue]);

	const convertTimerToFullDate = useCallback(() => {
		try {
			const timerString = timerSettingValue.targetTime;
			if (typeof timerString !== "string") return new Date();

			const [hours, minutes, seconds] = timerString
				.split(":")
				.map(Number);
			const currentDate = new Date();
			return setSeconds(
				setMinutes(setHours(currentDate, hours), minutes),
				seconds
			);
		} catch (error) {
			errorHandler("timerSetting", "convertTimerToFullDate", error);
			return new Date();
		}
	}, [timerSettingValue.targetTime]);

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
								selected={
									timerSettingValue.targetDate
										? new Date(timerSettingValue.targetDate)
										: undefined
								}
								onSelect={(value: Date | undefined) =>
									onChangeHandle("targetDate", value || "")
								}
								initialFocus
							/>

							<Divider spacing="small" />

							<div className={cn("px-3 mt-3")}>
								<TimePicker
									date={convertTimerToFullDate()}
									setDate={(value) => {
										if (value) {
											onChangeHandle(
												"targetTime",
												format(value, "HH:mm:ss")
											);
										}
									}}
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
					// @ts-ignore
					styles={currentUnitStyle}
					onUpdateSchemaHandle={(data) => {
						onChangeStyleHandle(timeStyleUnitType, data);
					}}
					hideRemove
				/>
			</div>
		</div>
	);
};

export default TimerSetting;
