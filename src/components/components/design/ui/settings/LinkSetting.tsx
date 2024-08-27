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
	add?: boolean;
}

interface Props {
	onSendParams: (params: ILinkSetting) => void;
	defaultParams: ILinkSetting;
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
const LinkSetting: React.FC<Props> = (props) => {
	const { onSendParams, defaultParams } = props;

	const [error, setError] = useState<string | null>(null);

	const [linkSetting, setLinkSetting] = useState<ILinkSetting>({
		url: "",
		add: false,
	});

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
			onSendParams({ url: value });
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message); // В случае ошибки показываем сообщение
			}
		}
	};

	const onChangeSettings = (
		value: string | boolean,
		key: keyof ILinkSetting
	) => {
		setLinkSetting((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});

		setError(null);
	};

	useEffect(() => {
		setLinkSetting({
			url: defaultParams?.url,
			add: !!defaultParams?.url,
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
						checked={linkSetting.add}
						onCheckedChange={(value) => {
							onChangeSettings(value, "add");
						}}
					/>
				</div>
			</div>
			<Input
				placeholder="Введите ссылку"
				disabled={!linkSetting.add}
				onChange={onChangeEmail}
			/>
			{error && (
				<p className={cn("text-red-600 text-xs mt-1")}>{error}</p>
			)}
		</div>
	);
};

export default LinkSetting;
