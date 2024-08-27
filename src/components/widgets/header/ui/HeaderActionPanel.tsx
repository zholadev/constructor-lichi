"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { Label } from "@/components/shared/shadcn/ui/label";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { Eye, SaveIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { ILangListDataItem } from "@/components/shared/types/interface";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const HeaderActionPanel: React.FC<Props> = (props) => {
	const {} = props;

	const { spaceModeThemeAction, spaceModeLanguageAction } =
		useDispatchAction();

	const { languageData } = useAppSelector((state) => state.app);
	const { spaceModeTheme, spaceModeDeviceType, spaceModeLanguage } =
		useAppSelector((state) => state.space);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для переключения режим темы для редактора
	 * @param value
	 */
	const toggleModeThemeHandle = (value: boolean) => {
		if (value) {
			spaceModeThemeAction("dark");
			return;
		}

		spaceModeThemeAction("light");
	};

	return (
		<div className={cn("flex items-center p-2 gap-4")}>
			<div
				className={cn(
					"uppercase text-xs text-gray-600 w-auto flex items-center gap-3 flex-row"
				)}
			>
				<span>{spaceModeDeviceType}</span> | <span>{spaceModeTheme}</span> | <span>{spaceModeLanguage}</span>
			</div>
			<Button variant="outline">
				<Eye />
			</Button>

			<div className="flex items-center space-x-2">
				<Switch
					id="theme-mode"
					checked={spaceModeTheme === "dark"}
					onCheckedChange={toggleModeThemeHandle}
				/>
				<Label htmlFor="theme-mode">
					{spaceModeTheme === "dark" ? <MoonIcon /> : <SunIcon />}
				</Label>
			</div>

			<Select
				disabled={languageData.length === 0}
				defaultValue={spaceModeLanguage}
				value={spaceModeLanguage}
				onValueChange={(value) => spaceModeLanguageAction(value)}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="font weight" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{languageData.map((lang: ILangListDataItem) => {
							return (
								<SelectItem key={lang.id} value={lang.id}>
									{lang.name}
								</SelectItem>
							);
						})}
					</SelectGroup>
				</SelectContent>
			</Select>

			<Button type="button" className={cn("flex items-center gap-2")}>
				<SaveIcon /> Сохранить
			</Button>
		</div>
	);
};

export default HeaderActionPanel;
