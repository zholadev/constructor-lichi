"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { FileIcon, MoonIcon, PlayIcon, SunIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { Label } from "@/components/shared/shadcn/ui/label";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

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

	const { spaceModeThemeAction } = useDispatchAction();

	const { spaceModeTheme } = useAppSelector((state) => state.space);

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
			<Button variant="outline">
				<PlayIcon />
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

			<Button type="button" className={cn("flex items-center gap-2")}>
				<FileIcon /> Сохранить
			</Button>
		</div>
	);
};

export default HeaderActionPanel;
