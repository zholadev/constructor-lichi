import React, { useEffect, useState } from "react";
import usePermission from "@/components/shared/hooks/usePermission";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ISchemaContentTextParams } from "@/components/shared/types/interface-schema-content";

interface Props {
	onUpdateSchemaHandle: (data: ISchemaContentTextParams) => void;
	defaultData: ISchemaContentTextParams;
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
	const { onUpdateSchemaHandle, defaultData } = props;
	const permission = usePermission();
	const toastMessage = useToastMessage();

	const [schemaValue, setSchemaValue] = useState<ISchemaContentTextParams>({
		ru: {
			value: "Default Title",
		},
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onChangeHandle = (key: string, value: string) => {
		if (!value) {
			toastMessage(
				`ValueError: ${!key ? "key" : "value"} is not defined`,
				"error"
			);
		}

		setSchemaValue((prevState) => {
			const updateValues = {
				...prevState,
				[key]: {
					value,
				},
			};

			if (onUpdateSchemaHandle) onUpdateSchemaHandle(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		if (!defaultData) return;
		setSchemaValue(defaultData);
	}, [defaultData]);

	if (!permission.content.textFill) {
		return null;
	}

	if (!schemaValue) {
		return null;
	}

	return (
		<div className={cn("w-full px-1")}>
			{Object.entries(schemaValue || {}).map(([key, text]) => {
				return (
					<div className={cn("mb-4")} key={key}>
						<h3 className={cn("text-xs uppercase mb-1")}>{key}</h3>

						<Input
							placeholder={text.value}
							value={text.value}
							onChange={(e) =>
								onChangeHandle(key, e.target.value)
							}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default TextFillContent;
