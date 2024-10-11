import React, { useEffect } from "react";
import { ISchemaSettingsTimer } from "@/components/shared/types/interface-schema-settings";
import { cn } from "@/components/lib/utils";
import { Popover, PopoverTrigger } from "@/components/shared/shadcn/ui/popover";
import { Button } from "@/components/shared/shadcn/ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/shared/shadcn/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { getFormattedDateSixDaysAhead } from "@/components/shared/utils/utils";

interface Props {
	settingValue?: ISchemaSettingsTimer;
	onSettingChange?: (value: ISchemaSettingsTimer) => void;
}

const convertDateForSend = (
	data: ISchemaSettingsTimer
): ISchemaSettingsTimer => {
	const { targetDate, targetTime } = data;

	return {
		targetDate: getFormattedDateSixDaysAhead(targetDate, false),
		targetTime,
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
	const { settingValue, onSettingChange } = props;

	const toastMessage = useToastMessage();

	const [timerSettingValue, setSettingValue] =
		React.useState<ISchemaSettingsTimer>({
			targetDate: "",
			targetTime: "00:00:00",
		});

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

	useEffect(() => {
		if (settingValue) {
			setSettingValue({
				...settingValue,
			});
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full")}>
			<div className={cn("flex flex-col")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Дата
				</h3>

				<div className={cn("bg-white")}>
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
							className="w-auto p-0 bg-white"
							align="start"
						>
							<Calendar
								mode="single"
								selected={timerSettingValue.targetDate}
								onSelect={(value) =>
									onSettingUpdateHandle("targetDate", value)
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* <div className={cn("flex flex-col")}> */}
			{/*	<h3>Выберите время</h3> */}
			{/* </div> */}
		</div>
	);
};

export default TimerSetting;
