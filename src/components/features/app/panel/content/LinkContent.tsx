import React, { ChangeEvent, useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { z } from "zod";
import { ISchemaContentLink } from "@/components/shared/types/interface-schema-content";
import { Button } from "@/components/shared/shadcn/ui/button";

const urlSchema = z
	.string()
	.url({ message: "Неверный формат URL" })
	.refine((value) => value.startsWith("https://"), {
		message: "URL должен начинаться с https://",
	});

type URLSchema = z.infer<typeof urlSchema>;

interface ILinkSetting {
	active?: boolean;
	src: URLSchema;
}

interface Props {
	onSendParams?: (params: ISchemaContentLink) => void;
	onRemoveParams?: () => void;
	defaultParams: ILinkSetting | unknown;
}

const getInternalSrcFromURL = (url: string): string | null => {
	try {
		const urlObject = new URL(url);
		const pathSegments = urlObject.pathname
			.split("/")
			.filter((segment: string) => segment);

		return pathSegments.length >= 3
			? pathSegments.slice(2).join("/")
			: null;
	} catch (error) {
		console.error("Invalid URL:", error);
		return null;
	}
};

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
	const { onSendParams, defaultParams, onRemoveParams } = props;

	const [error, setError] = useState<string | null>(null);

	const [linkSetting, setLinkSetting] = useState<ILinkSetting>({
		active: false,
		src: "",
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
					src: value,
				};
			});
			urlSchema.parse(value);
			setError(null);
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message);
			}
		}
	};

	const onConfirmHandle = () => {
		if (onSendParams) {
			const getInternalSrc = getInternalSrcFromURL(linkSetting.src);

			let updateValues: ISchemaContentLink = {
				href: {
					src: linkSetting.src,
					internal_src: getInternalSrc ?? "",
				},
			};

			// if (linkSetting.settings) {
			// 	updateValues.settings = linkSetting.settings;
			// }

			onSendParams(updateValues);
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

		if (!value) {
			if (onRemoveParams) onRemoveParams();
		}

		setError(null);
	};

	useEffect(() => {
		setLinkSetting(() => {
			let initValue: ILinkSetting = {
				src: defaultParams?.href?.src,
				active: !!defaultParams?.href?.src,
			};

			// if (defaultParams?.settings) {
			// 	initValue.settings = defaultParams?.settings;
			// }

			return initValue;
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
				value={linkSetting.src}
				defaultValue={linkSetting.src}
				placeholder="Введите ссылку"
				disabled={!linkSetting.active}
				onChange={onChangeEmail}
			/>
			{error && (
				<p className={cn("text-red-600 text-xs mt-1")}>{error}</p>
			)}

			<div className={cn("w-full justify-end mt-2")}>
				<Button
					type="button"
					variant="outline"
					onClick={onConfirmHandle}
					disabled={!linkSetting.active}
				>
					Добавить
				</Button>
			</div>
		</div>
	);
};

export default LinkContent;
