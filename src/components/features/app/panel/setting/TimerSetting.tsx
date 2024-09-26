import React from "react";
import { ISchemaSettingsTimer } from "@/components/shared/types/interface-schema-settings";
import { cn } from "@/components/lib/utils";

interface Props {}

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
	const {} = props;

	const [settingValue, setSettingValue] =
		React.useState<ISchemaSettingsTimer>({
			targetDate: "",
			targetTime: "00:00:00",
		});

	return (
		<div className={cn("w-full")}>
			<div className={cn("flex flex-col")}>
				<h3>Выберите дату</h3>
			</div>

			<div className={cn("flex flex-col")}>
				<h3>Выберите время</h3>
			</div>
		</div>
	);
};

export default TimerSetting;
