import React, { ChangeEvent, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { z } from "zod";

const nameSchema = z.string().url({ message: "Введите текст" }).min(3);

interface Props {
	name: string;
}

type NameSchema = z.infer<typeof nameSchema>;

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const RenameSchema: React.FC<Props> = (props) => {
	const { name } = props;

	const [error, setError] = useState<string | null>(null);
	const [nameValue, setNameValue] = useState<string>(name || "");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as NameSchema;
		try {
			setNameValue(value);
			nameSchema.parse(value);
			setError(null);
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message); // В случае ошибки показываем сообщение
			}
		}
	};

	return (
		<>
			<h3 className={cn("text-xs uppercase mb-3 text-gray-500")}>
				Переименовать
			</h3>

			<Input
				placeholder="Введите название"
				value={nameValue}
				defaultValue={nameValue}
				type="text"
				onChange={(e) => onChange(e)}
			/>

			{error && (
				<p className={cn("text-red-600 text-xs mt-1")}>{error}</p>
			)}
		</>
	);
};

export default RenameSchema;
