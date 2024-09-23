import React, { ChangeEvent, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { z } from "zod";
import { Button } from "@/components/shared/shadcn/ui/button";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSchemaUpdateMeta } from "@/components/shared/backend/requests/schema/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ReloadIcon } from "@radix-ui/react-icons";

const nameSchema = z.string().url({ message: "Введите текст" }).min(3);

interface Props {
	name: string;
	confirmAction: () => void;
}

type NameSchema = z.infer<typeof nameSchema>;

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const RenamePage: React.FC<Props> = (props) => {
	const { name, confirmAction } = props;

	const toastMessage = useToastMessage();
	const { apiFetchHandler, loading } = useApiRequest();

	const { spaceTemplateActionData } = useAppSelector((state) => state.space);

	console.log("spaceTemplateActionData", spaceTemplateActionData);

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
				setError(error.errors[0].message);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения список языков
	 */
	const fetchRename = async () => {
		if (!spaceTemplateActionData.id) {
			toastMessage("Id страницы отсутствует!", "error");
			return;
		}
		if (!nameValue) {
			toastMessage("Введите название страницы", "error");
			return;
		}
		await apiFetchHandler(
			apiMethodSchemaUpdateMeta,
			false,
			{
				onGetData: (params: IGetApiParams) => {
					if (params.success) {
						if (confirmAction) confirmAction();
					}
				},
			},
			[nameValue, spaceTemplateActionData?.id]
		);
	};

	return (
		<>
			{/* <h3 className={cn("text-xs uppercase mb-3 text-gray-500")}> */}
			{/*	Переименовать */}
			{/* </h3> */}

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

			<div
				className={cn(
					"mt-10 flex w-full justify-end items-center gap-2"
				)}
			>
				<Button disabled={loading} variant="ghost">
					Отмена
				</Button>
				<Button
					disabled={loading}
					onClick={fetchRename}
					variant="default"
				>
					{loading && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					Подтвердить
				</Button>
			</div>
		</>
	);
};

export default RenamePage;
