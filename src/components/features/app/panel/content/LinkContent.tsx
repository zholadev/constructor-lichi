import React, { ChangeEvent, useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { z } from "zod";

const urlSchema = z
	.string()
	.url({ message: "Неверный формат URL" })
	.refine((value) => value.startsWith("https://"), {
		message: "URL должен начинаться с https://",
	});

type URLSchema = z.infer<typeof urlSchema>;

interface ILinkSetting {
	url: URLSchema;
	active?: boolean;
}

interface Props {
	onSendParams?: (params: ILinkSetting) => void;
	defaultParams: ILinkSetting | unknown;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const LinkContent: React.FC<Props> = (props) => {
	const { onSendParams, defaultParams } = props;

	const [error, setError] = useState<string | null>(null);

	const [linkSetting, setLinkSetting] = useState<ILinkSetting>({
		url: "",
		active: false,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для заполнение ссылки и отправки в JSON
	 * @param e
	 */
	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as URLSchema;

		try {
			setLinkSetting((prev) => {
				return {
					...prev,
					url: value,
				};
			});
			urlSchema.parse(value);
			setError(null);

			if (onSendParams)
				onSendParams({ url: value, active: linkSetting.active });
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для переключение
	 * @param value
	 * @param key
	 */
	const onChangeSettings = (value: boolean, key: keyof ILinkSetting) => {
		setLinkSetting((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});

		if (onSendParams) onSendParams({ url: "", active: value });

		setError(null);
	};

	useEffect(() => {
		setLinkSetting({
			url: defaultParams?.url ?? "",
			active: defaultParams?.active ?? false,
		});
	}, [defaultParams]);

	return (
		<div className={cn("w-full py-2")}>
			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<div
					className={cn("flex w-full items-center justify-end gap-2")}
				>
					<Switch
						id="swiper-centeredSlides"
						checked={linkSetting.active}
						onCheckedChange={(value) => {
							onChangeSettings(value, "active");
						}}
					/>
				</div>
			</div>
			<Input
				value={linkSetting.url}
				defaultValue={linkSetting.url}
				placeholder="Введите ссылку"
				disabled={!linkSetting.active}
				onChange={onChangeEmail}
			/>
			{error && (
				<p className={cn("text-red-600 text-xs mt-1")}>{error}</p>
			)}
		</div>
	);
};

export default LinkContent;
