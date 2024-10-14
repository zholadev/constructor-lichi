import React, { useEffect, useState } from "react";
import usePermission from "@/components/shared/hooks/usePermission";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

interface Props {
	onSendParams: (value: Record<string, Record<"value", string>>) => void;
	defaultParams: Record<string, Record<"value", string>>;
}

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const TextFillContent: React.FC<Props> = (props) => {
	const { onSendParams, defaultParams } = props;
	const permission = usePermission();
	const toastMessage = useToastMessage();

	const [contentValues, setContentValues] = useState<
		Record<string, Record<"value", string>>
	>({});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных и отправка
	 * @param key
	 * @param value
	 */
	const onChangeContentHandle = (key: string, value: string) => {
		if (!value) {
			toastMessage(
				`ValueError: ${!key ? "key" : "value"} is not defined`,
				"error"
			);
		}

		setContentValues((prevState) => {
			const updateValues = {
				...prevState,
				[key]: {
					value,
				},
			};

			if (onSendParams) onSendParams(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		if (!defaultParams) return;
		setContentValues(defaultParams);
	}, [defaultParams]);

	if (!permission.content.textFill) {
		return null;
	}

	return (
		<div className={cn("w-full px-1")}>
			{Object.entries(contentValues || {}).map(([key, text]) => {
				return (
					<div className={cn("mb-4")} key={key}>
						<h3 className={cn("text-xs uppercase mb-1")}>{key}</h3>

						<Input
							placeholder={text.value}
							value={text.value}
							onChange={(e) =>
								onChangeContentHandle(key, e.target.value)
							}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default TextFillContent;
