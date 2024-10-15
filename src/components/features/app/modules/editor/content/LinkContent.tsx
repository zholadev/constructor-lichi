import React, { ChangeEvent, useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { z } from "zod";
import { ISchemaContentLinkHrefParams } from "@/components/shared/types/interface-schema-content";
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
	onUpdateSchemaHandle: (data: ISchemaContentLinkHrefParams) => void;
	onRemoveSchemaHandle: () => void;
	defaultData: ISchemaContentLinkHrefParams;
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
	const { onUpdateSchemaHandle, defaultData, onRemoveSchemaHandle } = props;

	const [error, setError] = useState<string | null>(null);

	const [schemaValue, setSchemaValue] = useState<ILinkSetting>({
		active: false,
		src: "",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для заполнение ссылки и отправки в JSON
	 * @param e
	 */
	const onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as URLSchema;

		try {
			setSchemaValue((prev) => {
				return {
					...prev,
					src: value,
				};
			});
			urlSchema.parse(value);
			setError(null);
			// eslint-disable-next-line no-shadow
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 */
	const onChangeHandle = () => {
		if (onUpdateSchemaHandle) {
			const getInternalSrc = getInternalSrcFromURL(schemaValue.src);

			const updateValues: ISchemaContentLinkHrefParams = {
				href: {
					src: schemaValue.src,
					internal_src: getInternalSrc ?? "",
				},
			};

			onUpdateSchemaHandle(updateValues);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для переключение ссылки
	 * @param value
	 * @param key
	 */
	const onChangeSettings = (value: boolean, key: keyof ILinkSetting) => {
		setSchemaValue((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});

		if (!value) {
			if (onRemoveSchemaHandle) onRemoveSchemaHandle();
		}

		setError(null);
	};

	useEffect(() => {
		if (defaultData) {
			setSchemaValue(() => {
				const initValue: ILinkSetting = {
					src: defaultData.href.src,
					active: !!defaultData.href.src,
				};

				return initValue;
			});
		}
	}, [defaultData]);

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
						id="link-active"
						checked={schemaValue.active}
						onCheckedChange={(value) => {
							onChangeSettings(value, "active");
						}}
					/>
				</div>
			</div>
			<Input
				value={schemaValue.src}
				defaultValue={schemaValue.src}
				placeholder="Введите ссылку"
				disabled={!schemaValue.active}
				onChange={onChangeLink}
			/>
			{error && (
				<p className={cn("text-red-600 text-xs mt-1")}>{error}</p>
			)}

			<div className={cn("w-full flex justify-end mt-2")}>
				<Button
					type="button"
					variant="outline"
					onClick={onChangeHandle}
					disabled={!schemaValue.active}
				>
					Добавить
				</Button>
			</div>
		</div>
	);
};

export default LinkContent;
